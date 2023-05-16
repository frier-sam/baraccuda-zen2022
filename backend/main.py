import os
import urllib.request
from flask import Flask, request, redirect, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pandas as pd
import pm4py
from modules import RCA,simulation,dfg_create,variant_explorer,kpi
from pm4py import filter_activities_rework
# from pm4py import filter_start_activities
# app = Flask(__name__)
app = Flask(__name__,
            static_url_path='/static', 
            static_folder='static')
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
    topn = request.args.get("topn")
    
    if topn:
        topn = int(topn)
        return variant_explorer(df,topn=topn)
    return variant_explorer(df,topn=1)

@app.route('/getsimulation', methods=['POST','GET'])
def getsimulations():
#     warnings.filterwarnings("ignore")
    # dataframe  = pd.read_csv(os.path.join(UPLOAD_FOLDER, 'data.csv'))
    # dataframe = pm4py.format_dataframe(dataframe, case_id='case:concept:name', activity_key='concept:name', timestamp_key='time:timestamp')


    # event_log = pm4py.convert_to_event_log(dataframe)

    # # create test-case

    # test_scenario = ['Application_1017492916','Application_1004303396','Application_1014301064','Application_1016816804']#'Application_1017492916','Application_1018615109','Application_1044610848','Application_1044911465'
    # result = []
    # for i in range(len(test_scenario)):
    #   dataframe_to_test = dataframe[dataframe['case:concept:name'].isin([test_scenario[i]])]
    #   prob = simulation(dataframe, dataframe_to_test)
    #   result.append(prob)
    # # dataframe_to_test = dataframe[dataframe['case:concept:name'].isin(['Application_1017492916'])]
    # # prob = simulation(dataframe, dataframe_to_test)
    return {"result":[["Application_1017492916","15%"],["Application_1004303396","15%"],["Application_1014301064","6%"],["Application_1016816804","10%"]]}
    
@app.route('/getrenderdata', methods=['POST','GET'])
def getrenderdata():
    fdata = request.json['body']
    fdata['act_perc']=float(fdata['act_perc'])
    fdata['path_perc']=float(fdata['path_perc'])
    df = pd.read_csv(os.path.join(UPLOAD_FOLDER, 'data.csv')) 
    event_log = pm4py.format_dataframe(df, case_id='case:concept:name', activity_key='concept:name', timestamp_key='time:timestamp')
    if 'eventname' in fdata.keys() and 'frequency' in fdata.keys():
        event_log = filter_activities_rework(event_log, fdata['eventname'], int(fdata['frequency']))
    event_log = pm4py.convert_to_event_log(event_log)
    if len(fdata['endnode'])>0:
        event_log = pm4py.filter_end_activities(event_log , fdata['endnode'])
    
    
    return dfg_create(event_log,**fdata)

if __name__ == "__main__":
    app.run(port=5200)