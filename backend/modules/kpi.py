import datetime as dt
import numpy as np
import pm4py
import pandas as pd
def kpi_calculate(event_log):
    kpi={}
    data=pm4py.convert_to_dataframe(event_log)
    data['time'] = pd.to_datetime(data['time:timestamp'])
    data['dates'] = data['time'].dt.date
    case_activity_data=data.groupby(['case:concept:name'])['case:concept:name'].count()
    case_time_data=(data.groupby(['case:concept:name']).agg({'time:timestamp':[np.max,np.min]}).reset_index()).droplevel(0,axis=1)
    case_time_data.columns=["case","max_time","min_time"]
    case_time_data['date_diff']=case_time_data["max_time"]-case_time_data["min_time"]


    kpi['min_date']=str(data['dates'].min())
    kpi['max_date']=str(data['dates'].max())
    kpi['Num of cases']=data['case:concept:name'].nunique()
    kpi['Activities']=data.shape[0]
    kpi['Min activities per case']=case_activity_data.min()
    kpi['Max activities per case']=case_activity_data.max()
    kpi['Avg activities per case']=case_activity_data.mean()
    kpi['Min time per case']=str(case_time_data['date_diff'].min())
    kpi['Max time per case']=str(case_time_data['date_diff'].max())
    kpi['Avg time per case']=str(case_time_data['date_diff'].mean())
    print(kpi)
    return kpi