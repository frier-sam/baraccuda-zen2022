import pandas as pd
import operator
import matplotlib.pyplot as plt
import plotly.io as pio
import numpy as np

def variant_explorer(df):

    """
    
    return data_dict which has the name of the process steps as the key in the format ('a', 'b', 'c') 
    and their corresponding value is the frequency of occurence of that key in the event_data available.
    
    
    
    """
    
    import pm4py
    
    event_log = pm4py.format_dataframe(df, case_id='case:concept:name', 
                                       activity_key='concept:name', timestamp_key='time:timestamp')
    event_log = pm4py.convert_to_event_log(event_log)

    data_dict = {}

    for keys,values in pm4py.get_variants_as_tuples(event_log).items():
        data_dict[keys] = len(values)
    
    num_cases = 0
    for i in data_dict.values():
        num_cases = num_cases+i
        
    data_dict_list_ordered = sorted(data_dict.items(), key=lambda x:x[1], reverse=True)
    data_dict_ordered = dict(data_dict_list_ordered)
    
    #-------------- CREATE LIST ------------------- #
    
    total_events = df.shape[0]
    number_variants = len(data_dict)

    event_file5 = pd.DataFrame(columns=['freq','Variant','sub_variant','size'])
    order_ = ['Variant 1','Variant 2','Variant 3','Variant 4','Variant 5',
              'Variant 6', 'Variant 7', 'Variant 8', 'Variant 9', 'Variant 10']
    for i in range(0,10):
        for j in range(0,len(list(data_dict_ordered.keys())[i])):
            event_file5 = pd.concat([event_file5, pd.DataFrame.from_records([{'freq':list(data_dict_ordered.values())[i],
                                                              'Variant':order_[i],
                                                              'sub_variant':list(data_dict_ordered.keys())[i][j],
                                                              'size': len(list(data_dict_ordered.keys())[i])
                                                             }])])
    event_file5.reset_index(inplace=True) 
    event_file5 = event_file5.drop(['index'], axis=1)
#     event_file5
    event_file5['sub_variant_2'] = event_file5['sub_variant'].str[:2]
    
    col         = 'sub_variant_2'
    conditions  = [event_file5[col]=='A_', event_file5[col]=='O_', event_file5[col]=='W_']
    choices     = [ 'Application', 'Offer', 'WorkFlow']

    event_file5['Legend'] = np.select(conditions, choices, default=np.nan)

#     event_file5['Legend'] = np.where(event_file5['sub_variant'])
    
    # -------------- PLOT CODE -------------------#
    
    event_file5['freq_divide_size'] = event_file5['freq']/event_file5['size']
    
    import plotly.express as px

    fig = px.bar(event_file5, x="freq_divide_size", y="Variant", color='Legend', orientation='h',
                 height=400,
                 title='Top 10 Variants', custom_data =['freq','sub_variant','Legend'])
    fig.update_xaxes(visible=False, showticklabels=False)
#     fig.show()
#     fig.add_trace(event_file5['sub_variant'])
    
    
    fig.update_traces(
        hovertemplate="<br>".join([
                                "#Cases: %{customdata[0]}",
                                "Event: %{customdata[1]}",
                                "EventType: %{customdata[2]}",
                                ])
        )

    
    return {
        'total_events':total_events,
        'number_variants':number_variants,
        'num_cases':num_cases,
        'plot_data':pio.to_json(fig)
        # 'variant_top10':variant_top10
    }
