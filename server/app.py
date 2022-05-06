import os
import jinja2
from subprocess import call
import os.path as osp
from flask import Flask, jsonify, request, session, make_response
from flask_session import Session
import pickle
from vectorrvnn.utils import *
from vectorrvnn.data import *
from vectorrvnn.geometry import *
import requests
import svgpathtools as svg
import uuid
import json
from functools import partial
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def rootdir():  
    return osp.abspath(osp.dirname(__file__))

# Setup application.
app = Flask(__name__, static_url_path='', static_folder='../client/build')
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)

# Important globals.
CAPTCHA_VERIFY = 'https://www.google.com/recaptcha/api/siteverify'
CAPTCHA_SECRET = os.environ['CAPTCHA_SECRET']
GMAIL_USER_NAME = os.environ['GMAIL_USER_NAME']
GMAIL_PASSWD = os.environ['GMAIL_PASSWD']
EMOJI_DATASET = '../../emoji-dataset/interesting/'
DATADIR = './assets/tasks/'
ANNO_BASE = './data-screen/'
NTASKS = 1
SVGS = list(filter(
    lambda x : x.endswith('svg'), 
    allfiles(DATADIR)
))
GROUP_HEURISTICS=[
    groupByShapeContexts
]
rng.seed(100)

def dumpJson (fileName, payload) : 
    with open(fileName, 'w+') as fp :
        json.dump(payload, fp) 

def dumpStr (fileName, payload, mode='a+') : 
    with open(fileName, mode) as fp: 
        fp.write(payload + '\n') 

def getGroups (tree) : 
    groups = []
    for heuristic in GROUP_HEURISTICS : 
        groups.extend(heuristic(tree)) 
    # Some of these groups may overlap. But we can only present 
    # non-overlapping groups. Finding the maximum number 
    # of non-overlapping groups is NP Complete. Hence, we'll 
    # make a simple approximation
    rng.shuffle(groups)
    mark = [False for _ in range(tree.nPaths)]
    selected = []
    for g in groups : 
        if all([not mark[_] for _ in g]) : 
            selected.append([int(_) for _ in g])
            for _ in g :
                mark[_] = True
    return selected

def sendEmail(to, cid) :
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "VGTrees Annotation Survey"
    msg['From'] = GMAIL_USER_NAME
    with open('./assets/email_template.html') as fp : 
        templateStr = fp.read()
    template = jinja2.Template(templateStr)
    html = template.render(cid=cid) 
    msgPart = MIMEText(html, 'html')
    msg.attach(msgPart)
    try : 
        mail = smtplib.SMTP('smtp.gmail.com', 587)
        mail.starttls()
        mail.login(GMAIL_USER_NAME, GMAIL_PASSWD)
        mail.sendmail(GMAIL_USER_NAME, to, msg.as_string())
        mail.quit()
    except Exception as e: 
        print(f'Error - {e}')

@app.route('/')
def root():  
    session['id'] = uuid.uuid4()
    session['tasks'] = rng.sample(range(len(SVGS)), NTASKS)
    mkdir(f'{ANNO_BASE}/{session["id"]}') 
    for i in session['tasks'] : 
        dumpStr(f'{ANNO_BASE}/{session["id"]}/tasks.txt', SVGS[i])
    with open(f'{app.static_folder}/index.html') as fp :
        content = fp.read()
    resp = make_response(content)
    return resp

@app.route('/vis') 
def vis () :
    with open(f'{app.static_folder}/vis.html') as fp: 
        content = fp.read()
    return make_response(content)

@app.route('/emoji-dataset', methods=['POST', 'GET']) 
def emojiDataset () : 
    startId = request.json['startId']
    number = request.json['number']
    svgFiles = listdir(EMOJI_DATASET)[startId:startId+number]
    svgs = []
    for svgFile in svgFiles: 
        with open(svgFile) as fp : 
            svgs.append(fp.read())
    return jsonify(svgs=svgs)

@app.route('/task', methods=['POST', 'GET']) 
def task () : 
    taskNum = request.json['taskNum']
    svgFile = SVGS[session['tasks'][taskNum]]
    tree = SVGData(svgFile, convert2usvg=True) 
    groups = getGroups(tree)
    return jsonify(svg=tree.svg, groups=groups, filename=svgFile)

@app.route('/validate', methods=['POST', 'GET'])
def validate () : 
    token = request.json['captchaValue']
    email = request.json['email']
    turkid = request.json['turkid']
    payload = {
        "secret": CAPTCHA_SECRET,
        "response": token
    }
    resp = requests.post(CAPTCHA_VERIFY, data=payload).json()
    if resp['success'] : 
        id = session['id']
        dumpStr(f'{ANNO_BASE}/{id}/email.txt', email)
        dumpStr(f'{ANNO_BASE}/{id}/turkid.txt', turkid)
    return jsonify(success=resp['success'])

@app.route('/logip', methods=['POST', 'GET']) 
def logip () :
    id = session['id']
    dumpJson(f'{ANNO_BASE}/{id}/ip.json', request.json)
    return jsonify(success=True)

@app.route('/tutorialgraphic', methods=['POST', 'GET'])
def tutorialgraphic () :
    with open('./assets/tutorial.svg') as fd :
        svg = fd.read()
    return jsonify(svg=svg, filename='tutorial.svg')

@app.route('/checktutorial', methods=['POST', 'GET']) 
def checktutorial () : 
    id = session['id']
    with open('./assets/tutorial.pkl', 'rb') as fp: 
        T = pickle.load(fp) 
    T_ = appGraph2nxGraph(request.json['graph'])
    assert(len(leaves(T)) == len(leaves(T_)))
    dumpJson(f'{ANNO_BASE}/{id}/tutorialTree.json', request.json)
    score = norm_cted(T, T_)
    dumpStr(f'{ANNO_BASE}/{id}/tutscores.txt', str(score))
    success = score < 0.25
    return jsonify(success=success)

@app.route('/survey', methods=['POST', 'GET']) 
def survey () :
    id = session['id']
    dumpJson(f'{ANNO_BASE}/{id}/survey.json', request.json)
    return jsonify(success=True)

@app.route('/tree', methods=['POST', 'GET'])
def tree () : 
    id = session['id']
    taskNum = request.json['taskNum']
    dumpJson(f'{ANNO_BASE}/{id}/treeData{taskNum}.json', request.json)
    return jsonify(success=True)

@app.route('/time', methods=['POST', 'GET'])
def time () : 
    id = session['id'] 
    payload = request.json
    if payload.get('start', False) :
        dumpJson(f'{ANNO_BASE}/{id}/startTime.json', payload)
    elif payload.get('end', False) : 
        dumpJson(f'{ANNO_BASE}/{id}/endTime.json', payload)
    elif payload.get('slideId', None) is not None : 
        dumpStr(f'{ANNO_BASE}/{id}/slideTime.json', json.dumps(payload))
    return jsonify(success=True)

@app.route('/comments', methods=['POST', 'GET'])
def comments () : 
    id = session['id']
    comments = request.json['comments']
    dumpStr(f'{ANNO_BASE}/{id}/comments.txt', comments)
    cid = str(uuid.uuid4())[:6]
    dumpStr(f'{ANNO_BASE}/{id}/cid.txt', cid)
    try : 
        with open(f'{ANNO_BASE}/{id}/email.txt') as fp : 
            email = fp.read().strip()
        sendEmail(email, cid)
    except Exception: pass
    return jsonify(cid=cid, success=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
