import pandas as pd
import operator
import matplotlib.pyplot as plt
import plotly.io as pio
import numpy as np
def variant_explorer(event_file, topn=10):

    """
    event_file is the dataframe
    return data_dict which has the name of the process steps as the key in the format ('a', 'b', 'c') and
        their corresponding value is the frequency of occurence of that key in the event_data available
    filtered_event_log is pm4py format. Not df, Not csv
    """
    
    import pm4py

#   convert csv to event log
    event_log = pm4py.format_dataframe(event_file, case_id='case:concept:name', activity_key='concept:name', timestamp_key='time:timestamp')
    event_log = pm4py.convert_to_event_log(event_log)

    data_dict = {}

#   dict's keys are the variant and values is the freq of occurence of that variant
    for keys,values in pm4py.get_variants_as_tuples(event_log).items():
        data_dict[keys] = len(values)
    
#   finding total # of cases by summing the values of teh dict
    cases = 0
    for i in data_dict.values():
        cases = cases+i

#   ordering the dict containing keys as the variant and values as the freq of it        
    def top_n_values(data, n):
        # Invert the keys and values.
        inverted_dict = {value: key for key, value in data.items()}
        # Sort the keys in descending order.
        sorted_keys = sorted(inverted_dict, reverse=True)
        # Get the top n keys.
        top_n_keys = sorted_keys[:n]
        # Create a new dictionary with the top n values.
        top_n_values = {}
        for key in top_n_keys:
            top_n_values[key] = inverted_dict[key]
        return top_n_values
    
    
    filtered_log = top_n_values(data_dict,10)
    data_dict_list_ordered = sorted(data_dict.items(), key=lambda x:x[1], reverse=True)
    data_dict_ordered = dict(data_dict_list_ordered)
    
    # -------------- CREATE DATAFRAME TO PLOT -------------------#

    event_file5 = pd.DataFrame(columns=['freq','Variant','sub_variant','size'])

#   y axis labels
    order_ = []
    for i in range(0,topn):
        order_.append('Variant ' + str(i+1))
    
#   adding values to df with variant#, variant's flow and freq in it
    for i in range(0,topn):
        for j in range(0,len(list(data_dict_ordered.keys())[i])):
            event_file5 = pd.concat([event_file5, pd.DataFrame.from_records([{'freq':list(data_dict_ordered.values())[i],
                                                              'Variant':order_[i],
                                                              'sub_variant':list(data_dict_ordered.keys())[i][j],
                                                              'size': len(list(data_dict_ordered.keys())[i])
                                                             }])])
    event_file5.reset_index(drop=True, inplace=True) 

    event_file5['sub_variant_2'] = event_file5['sub_variant'].str[:2]
    
    col         = 'sub_variant_2'
    conditions  = [event_file5[col]=='A_', event_file5[col]=='O_', event_file5[col]=='W_']
    choices     = [ 'Application', 'Offer', 'WorkFlow']

    event_file5['Legend'] = np.select(conditions, choices, default=np.nan)
    
    # -------------- PLOT CODE -------------------#
    
    event_file5['freq_divide_size'] = event_file5['freq']/event_file5['size']
    
    import plotly.express as px

    title_fig = 'Top ' +str(topn)+ ' Variants'
    fig = px.bar(event_file5, x="freq_divide_size", y="Variant", color='Legend', orientation='h',
                 height=400,
                 title=title_fig, custom_data =['freq','sub_variant','Legend'])
    fig.update_xaxes(visible=False, showticklabels=False)  
    
    fig.update_traces(
        hovertemplate="<br>".join([
                                "#Cases: %{customdata[0]}",
                                "Event: %{customdata[1]}",
                                "EventType: %{customdata[2]}",
                                ])
        )
    
    # print({"data_dict_ordered":data_dict_ordered,
    #         "event_file-shape":event_file.shape[0],
    #         "len datadicst":len(data_dict),
    #         "event_file5":  event_file5, 
    #         "filtered_log":filtered_log})

    return {
        # "data_dict_ordered":data_dict_ordered,
            "total_events":event_file.shape[0],
            "number_variants":len(data_dict),
            "num_cases":  cases, 
            "Varients":filtered_log,
            'plot_data':pio.to_json(fig)
            }
    # return {
    #     'total_events':total_events,
    #     'number_variants':number_variants,
    #     'num_cases':cases,
    #     'plot_data':pio.to_json(fig)
    #     # 'variant_top10':variant_top10
    # }