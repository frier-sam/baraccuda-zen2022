import pm4py
from pm4py import filter_activities_rework

def filter_pane_rework(event_log, params : dict):
    event_name = params.get('event_name',None)
    rework_freq_min = params.get('rework_freq_min',1)
    if rework_freq_min < 1:
        raise ValueError('Allowed values for parameter:rework_freq_min is >= 1 only')
    if event_name is not None:
        event_log = filter_activities_rework(event_log, event_name, rework_freq_min)
    return event_log