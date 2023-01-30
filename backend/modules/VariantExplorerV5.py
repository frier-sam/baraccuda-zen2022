import pandas as pd
import operator
import matplotlib.pyplot as plt

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
    
    variant_list = list(data_dict_ordered.keys())
    freq_list = list(data_dict_ordered.values())

    variant_list_num = []
    # len_variant = len(variant_list)
    for i in range(0,len(variant_list)):
        variant_list_num.append((i+1))
        
    variant_top10 = variant_list[:10]
    
    #-------------- PLOT CODE ------------------- #
    
    # y=variant_list_num
    # y10 = y[:10]
    
    # x = freq_list
    # x10 = x[:10]
    
    # ax = plt.axes()
    # ax.set_yticks(y10)
    
    # plt.barh(y10, x10)
    
    # plt.ylabel("Order")
    # plt.xlabel("Frequency")
    
    # plt.ylim(max(y10)+1, min(y10)-1)

    # # setting label of x and y-axis
    
    # plt.title("Frequency of Variants")

    plot_data={
        "data": [
            {
                "x": variant_list_num[:10],
                "y": freq_list[:10],
                "type": "bar"
            }
        ]
    }
    
    total_events = df.shape[0]
    number_variants = len(data_dict)
    
    return {
        'total_events':total_events,
        'number_variants':number_variants,
        'num_cases':num_cases,
        'plot_data':plot_data,
        'variant_top10':variant_top10
    }
