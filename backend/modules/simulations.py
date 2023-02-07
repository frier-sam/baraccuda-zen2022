def simulation(dataframe, sample_test_event_dataframe):
  # processing the test_sample_log_dataframe
  list_case = list(sample_test_event_dataframe['concept:name'])
  sample_test_log = [list_case[0:i] for i in range(1, len(list_case)+1)]

  # filter cancelled application from event log
  cancelled_data = dataframe[dataframe['concept:name'] == 'A_Cancelled']

  # flagging the applications having cancelled application
  cancelled_data['Case:cancelled'] = 'Cancelled'
  cancelled_data_filt = cancelled_data[['case:concept:name','Case:cancelled']]
  cancelled_data_filt.reset_index(drop = True, inplace = True)

  # merge flagged application
  dataframe_new = dataframe.merge(cancelled_data_filt, on = 'case:concept:name', how = 'left')
  dataframe_new['Case:cancelled'] = dataframe_new['Case:cancelled'].fillna('Non_Cancelled')

  ##  Add aggregated sequential flow of event for each application 
  dataframe_work =  dataframe_new[['Action','EventOrigin','concept:name','case:concept:name', 'Case:cancelled']]\
  # get all applications of data in list
  all_applications = list(dataframe_work['case:concept:name'].unique())
  column_to_add = []
  # iterate through all application to find the process probability
  for i in all_applications:
    sub = dataframe_work[dataframe_work['case:concept:name'].isin([i])]
    event_flow = list(sub['concept:name'])
    sub_list = [event_flow[0:i] for i in range(1, (len(event_flow)+1))]
    for j in sub_list:
      column_to_add.append(j)
  dataframe_work['sub_case:concept:name'] = column_to_add

  import numpy as np
  dataframe_work['prob_flag'] = np.nan

  ## write funtion to return value required to flag
  def normalise_row(row, value):
      if(row['sub_case:concept:name'] == value):
        return 1
      else:
        return row['prob_flag']

  ### iterate through the test event_log and generate a flag where sub-sequence of events are matching in data
  for i in sample_test_log:
    dataframe_work['prob_flag'] = dataframe_work.apply(lambda row : normalise_row(row, i), axis=1) 
  
  probability_of_cancellation = np.round((len(dataframe_work[dataframe_work['prob_flag'] == 1])/len(dataframe_work)),2)
  return (probability_of_cancellation)

