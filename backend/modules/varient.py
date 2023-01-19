    
import pm4py
def variant_explorer(df):

    """
    return data_dict which has the name of the process steps as the key in the format ('a', 'b', 'c') and their corresponding value is the frequency of occurence of that key in the event_data available    
    
    """
    event_log = pm4py.format_dataframe(df, case_id='case:concept:name', activity_key='concept:name', timestamp_key='time:timestamp')
    event_log = pm4py.convert_to_event_log(event_log)

    data_dict = {}

    for keys,values in pm4py.get_variants_as_tuples(event_log).items():
        data_dict[keys] = len(values)
    
    return data_dict