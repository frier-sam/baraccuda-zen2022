def dfg_create(filtered_event_data , act_perc = 1, path_perc = 1 , view_type = 'act_cnt',unit='hours',**kwargs):

    """
    Function to get Directly Follows Graph
    
    Required Parameters 
    
    filtered_event_data : Event Data (Filtered before pulling in for Process Explorer)
    
    act_perc(default : 1) : Percentage of Activities (top) by cases to be shown. Values between [0.00 , 1.00] 
    
    path_perc(default : 1) : Percentage of Paths (top) by cases to be shown. Values between [0.00 , 1.00] 
    
    view_type : Type of edge values 
                values can range from act_cnt : activity or event count
                                      case_cnt : case count
                                      performace : time between two activities
    
    unit : unit of time in case of performace type metric:
           values can range from (d : days) , (h = hours) , (m = mins) , (s : a - default) 
    
    """
    import pm4py
    from pm4py.statistics.start_activities.log import get as start_activities_module
    from pm4py.statistics.end_activities.log import get as end_activities_module
    from pm4py.utils import get_properties

    start_activities = start_activities_module.get_start_activities(filtered_event_data, parameters=get_properties(filtered_event_data))
    end_activities = end_activities_module.get_end_activities(filtered_event_data, parameters=get_properties(filtered_event_data))

    activities_count = pm4py.get_event_attribute_values(filtered_event_data, "concept:name")
    
    if view_type == 'act_cnt':
        variant = pm4py.algo.discovery.dfg.variants.native
    elif view_type == 'performance':
        variant = pm4py.algo.discovery.dfg.variants.performance    
    elif view_type == 'case_cnt':
        variant = pm4py.algo.discovery.dfg.variants.case_attributes
        
    
    dfg = pm4py.algo.discovery.dfg.algorithm.apply(filtered_event_data,parameters={'AGGREGATION_MEASURE':'max'},variant=variant)

    if view_type == 'case_cnt':
        from collections import Counter
        dfg_old = dfg
        dfg = {}
        for key in dfg_old.keys():
            dfg[key] = len(dfg_old[key]['concept:name'])

        dfg=Counter(dfg)
        del(dfg_old)
    
    dfg, start_activities, end_activities, activities_count = pm4py.algo.filtering.dfg.dfg_filtering.filter_dfg_on_activities_percentage(dfg, start_activities, end_activities, activities_count, act_perc)

    dfg, start_activities, end_activities, activities_count = pm4py.algo.filtering.dfg.dfg_filtering.filter_dfg_on_paths_percentage(dfg, start_activities, end_activities, activities_count, path_perc)
    
    activities = set()
    for names in list(dfg.keys()):
        activities.add(names[0])
        activities.add(names[1])
  
    factor = 1
    
    if unit == 'h':
        factor = 3600
    elif unit == 'm':
        factor = 60        
    elif unit == 'd':
        factor = 3600*24 

    values_list = []
    for key in dfg:
        values_list.append([key[0],key[1],dfg[key]/factor,'{:.2f} {}'.format(dfg[key]/factor , unit)])

    for starts in start_activities:
        values_list.append(['Start',starts,start_activities[starts],start_activities[starts]])

    for ends in end_activities:
        values_list.append([ends,'End',end_activities[ends],end_activities[ends]])
    
    
    nodes = [{ 'id': act, 
                'data': { 'label': act,'volume': act+ '['+str(activities_count[act])+ ']' },
             }  for act in activities]
    
    nodes.append({ 'id':'Start', 
#                     'type': 'output',
                    'data': { 'label': 'Start','volume':'Start ['+str(sum(start_activities.values()))+ ']' },     
                 })
    
    nodes.append({'id':'End', 
#                   'type': 'input',
                  'data': { 'label': 'End', 'volume':'End ['+str(sum(end_activities.values()))+ ']' },     
                         
                 })

    edges = [{'source': elements[0], 
               'target': elements[1], 
               'weight': elements[2], 
               'cases': elements[3],
              'label': elements[3],
              'type':'smoothstep',
              'animated': True 
             }  for elements in values_list]
    
    
    return {'dfg':[nodes , edges] , "start":start_activities,"end":end_activities}
            
            