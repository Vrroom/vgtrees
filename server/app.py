import os
from subprocess import call
import os.path as osp
from flask import Flask, jsonify, request, session, make_response
from flask_session import Session
import pickle
from vectorrvnn.utils import *
from vectorrvnn.data import *
import sys
import svgpathtools as svg
import pandas as pd
import requests

def rootdir():  
    return osp.abspath(osp.dirname(__file__))

# Setup application.
app = Flask(__name__, static_url_path='', static_folder='../client/build')
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)

CAPTCHA_VERIFY = 'https://www.google.com/recaptcha/api/siteverify'
CAPTCHA_SECRET = '6LezYj4eAAAAABSLfUxNKa-x_0XhyJ8ZdL0rYds-'

svgs = None
id = 0

@app.route('/')
def root():  
    with open(f'{app.static_folder}/index.html') as fp :
        content = fp.read()
    resp = make_response(content)
    return resp

@app.route('/task', methods=['POST', 'GET']) 
def task () : 
    global id
    svgFile = svgs[id]
    print(f'Checked {100 * id / len(svgs)} %')
    id += 1
    outFile = '/tmp/o.svg'
    call(['usvg_conv', svgFile, outFile])
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
    return jsonify(success=resp['success'])

@app.route('/accept', methods=['POST', 'GET'])
def accept () : 
    filename = request.json['filename']
    status = request.json['status']
    #with open('accepted.csv', 'a+') as fd : 
    #    fd.write(f'{filename}, {status}\n')
    return 'ok'

@app.route('/logip', methods=['POST', 'GET']) 
def logip () :
    payload = request.json
    print(payload)
    return 'ok'

if __name__ == '__main__':
    datadir = sys.argv[1]
    svgs = list(filter(
        lambda x : x.endswith('svg'), 
        allfiles(datadir)
    ))
    app.run(host='0.0.0.0', port=80)

