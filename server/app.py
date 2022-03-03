import os
from subprocess import call
import os.path as osp
from flask import Flask, jsonify, request, session, make_response
from flask_session import Session
import pickle
from vectorrvnn.utils import *
from vectorrvnn.data import *
import requests
import sys
import svgpathtools as svg
import uuid
import json

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
DATADIR = '../../vectorrvnn/Emojis'
SVGS = list(filter(
    lambda x : x.endswith('svg'), 
    allfiles(DATADIR)
))

@app.route('/')
def root():  
    session['id'] = uuid.uuid4()
    session['tasks'] = rng.sample(range(len(SVGS)), 5)
    mkdir(f'../data/{session["id"]}') 
    with open(f'{app.static_folder}/index.html') as fp :
        content = fp.read()
    resp = make_response(content)
    return resp

@app.route('/task', methods=['POST', 'GET']) 
def task () : 
    taskNum = request.json['taskNum']
    svgFile = SVGS[session['tasks'][taskNum]]
    outFile = '/tmp/o.svg'
    call(['./usvg', svgFile, outFile])
    with open(outFile) as fd :
        content = fd.read()
    return jsonify(svg=content, filename=svgFile)

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
        with open(f'../data/{id}/email.txt', 'w+') as fp : 
            fp.write(email)
        with open(f'../data/{id}/turkid.txt', 'w+') as fp :
            fp.write(turkid)
    return jsonify(success=resp['success'])

@app.route('/logip', methods=['POST', 'GET']) 
def logip () :
    id = session['id']
    payload = request.json
    with open(f'../data/{id}/ip.json', 'w+') as fp: 
        json.dump(payload, fp)
    return jsonify(success=True)

@app.route('/tutorialgraphic', methods=['POST', 'GET'])
def tutorialgraphic () :
    with open('./assets/tutorial.svg') as fd :
        content = fd.read()
    return jsonify(svg=content, filename='tutorial.svg')

@app.route('/survey', methods=['POST', 'GET']) 
def survey () :
    id = session['id']
    ratings = request.json
    with open(f'../data/{id}/survey.txt', 'w+') as fp :
        for i, r in enumerate(ratings) :
            fp.write(f'{i}, {r}\n')
    return jsonify(success=True)

@app.route('/tree', methods=['POST', 'GET'])
def tree () : 
    id = session['id']
    payload = request.json
    with open(f'../data/{id}/treeData.json', 'w+') as fp :
        json.dump(payload, fp)
    return jsonify(success=True)

@app.route('/comments', methods=['POST', 'GET'])
def comments () : 
    id = session['id']
    comments = request.json['comments']
    with open(f'../data/{id}/comments.txt', 'w+') as fp :
        fp.write(comments + '\n') 
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)

