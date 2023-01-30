import os
import urllib.request
from flask import Flask, request, redirect, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pandas as pd
import pm4py
from modules import RCA,simulation,dfg_create,variant_explorer,kpi
# app = Flask(__name__)
app = Flask(__name__)
CORS(app)



UPLOAD_FOLDER = os.path.join(os.path.abspath(os.getcwd()),'zennovatefiles')





ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/file-upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return 'No selected file'
        if file:
            # save the file to a specified location
            dpath = os.path.join(UPLOAD_FOLDER, 'data.csv')
            if os.path.exists(dpath):
                os.remove(dpath)
            file.save(os.path.join(UPLOAD_FOLDER, 'data.csv'))
            return 'File successfully uploaded'

@app.route('/ping', methods=['GET'])
def ping():
    return 'pong'

@app.route('/getrca', methods=['POST','GET'])
def getrca():
    return RCA(os.path.join(UPLOAD_FOLDER, 'data.csv'))

@app.route('/getkpi', methods=['POST','GET'])
def getkpi():
    dataframe  = pd.read_csv(os.path.join(UPLOAD_FOLDER, 'data.csv'))
    dataframe = pm4py.format_dataframe(dataframe, case_id='case:concept:name', activity_key='concept:name', timestamp_key='time:timestamp')
    event_log = pm4py.convert_to_event_log(dataframe)
    return kpi(event_log)

@app.route('/getvariant', methods=['POST','GET'])
def getvariant():
    df = pd.read_csv(os.path.join(UPLOAD_FOLDER, 'data.csv'))
    return variant_explorer(df)

@app.route('/getsimulation', methods=['POST','GET'])
def getsimulations():
#     warnings.filterwarnings("ignore")
    dataframe  = pd.read_csv(os.path.join(UPLOAD_FOLDER, 'data.csv'))
    dataframe = pm4py.format_dataframe(dataframe, case_id='case:concept:name', activity_key='concept:name', timestamp_key='time:timestamp')
    event_log = pm4py.convert_to_event_log(dataframe)

    # create test-case
    dataframe_to_test = dataframe[dataframe['case:concept:name'].isin(['Application_1017492916'])]
    prob = simulation(dataframe, dataframe_to_test)
    return {'Cases':{'Cancellation':prob}}
    
@app.route('/getrenderdata', methods=['POST','GET'])
def getrenderdata():
    fdata = request.json['body']
    fdata['act_perc']=float(fdata['act_perc'])
    fdata['path_perc']=float(fdata['path_perc'])
    df = pd.read_csv(os.path.join(UPLOAD_FOLDER, 'data.csv')) 
    event_log = pm4py.format_dataframe(df, case_id='case:concept:name', activity_key='concept:name', timestamp_key='time:timestamp')
    event_log = pm4py.convert_to_event_log(event_log)
    return dfg_create(event_log,**fdata)

if __name__ == "__main__":
    app.run()