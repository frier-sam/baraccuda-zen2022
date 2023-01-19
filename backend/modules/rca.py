import pm4py
import datetime
import pandas as pd
import plotly.express as px
import numpy as np
from pm4py.objects.log.util import dataframe_utils
from pm4py.objects.conversion.log import converter as log_converter
from pm4py.objects.log.importer.xes import importer as xes_importer

# process mining 
from pm4py.algo.discovery.dfg import algorithm as dfg_discovery
from pm4py.algo.discovery.alpha import algorithm as alpha_miner
from pm4py.algo.discovery.inductive import algorithm as inductive_miner
from pm4py.algo.discovery.heuristics import algorithm as heuristics_miner

# viz
from pm4py.visualization.dfg import visualizer as dfg_visualization
#from pm4py.visualization.petrinet import visualizer as pn_visualizer
from pm4py.visualization.process_tree import visualizer as pt_visualizer
from pm4py.visualization.heuristics_net import visualizer as hn_visualizer

# misc 
from pm4py.objects.conversion.process_tree import converter as pt_converter

# filters and stats
from pm4py.algo.filtering.log.attributes import attributes_filter
from pm4py.algo.filtering.log.variants import variants_filter
#from pm4py.statistics.traces.log import case_statistics

## tree visualizer
import math
from sklearn import tree
from pm4py.objects.log.util import get_class_representation
from pm4py.visualization.decisiontree import visualizer as dectree_visualizer
from pm4py.algo.transformation.log_to_features import algorithm as log_to_features
import plotly.io as pio

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)


# def activities(event_log):
#   start_activities = pm4py.get_start_activities(event_log)
#   end_activities = pm4py.get_end_activities(event_log)
#   return(start_activities, end_activities)

# start_activities,end_activities = activities(event_log)
# # print(start_activities)
# # print(end_activities)

# """All our 492 cases started with "A_Create Application" while the majority ended with either "W_Validate application", "W_Call after offers", "o_cancelled" and "W_Call incomplete files"

# Filter on variants
# A variant is a set of cases that share the same control-flow perspective, so a set of cases that share the same classified events (activities) in the same order. In this section, we will focus for all methods first on log objects, then we will continue with the dataframe.
# """

#Other variants-based filters are offered. The filters on the top-k variants keeps in the log only the cases following one of the k most frequent variants:
def variants(event_log, n):
  k = n
  filtered_log = pm4py.filter_variants_top_k(event_log, k)
  return (filtered_log)
#filtered_log = variants(event_log, 4)
# print(filtered_log[0])
# print(filtered_log[1])
# print(filtered_log[2])
# print(filtered_log[3])

##  Data filtering for application based

pd.set_option("display.max_rows", None, "display.max_columns", None)
from scipy.stats import skew, mode
def filtered_data(dataframe, stats_of_requested_amount, stats_of_withdrawl_amount):
  agg_func_stats1 = {'case:ApplicationType': [pd.Series.mode], 'case:LoanGoal': [pd.Series.mode]}
  filtered_1 = pd.DataFrame(dataframe.groupby(['case:concept:name']).agg(agg_func_stats1)).reset_index(drop = False)
  ind = pd.Index([e[0] for e in filtered_1.columns.tolist()])
  filtered_1.columns = ind
  filtered_2 = pd.DataFrame(dataframe.groupby(['case:concept:name']).agg({'case:RequestedAmount': stats_of_requested_amount, 'FirstWithdrawalAmount':stats_of_withdrawl_amount})).reset_index(drop = False)
  filtered = pd.merge(filtered_1,filtered_2, on = 'case:concept:name', how = 'left')
  return(filtered)

#filtered = filtered_data(dataframe,'mean', 'sum')
#print(filtered.head())

"""#### Case:LoanGoal distribution"""


def loan_goal_dist(filtered_data):
  data_loan = pd.DataFrame(filtered_data['case:LoanGoal'].value_counts()).reset_index(drop = False)
  data_loan.rename(columns = {'index':'LoanGoal', 'case:LoanGoal':'count'}, inplace = True)
  fig = px.pie(data_loan, values='count', names='LoanGoal', title='distribution of loan goal')
  #fig.show()
  return(fig)

"""#### Case: Application type distribution"""


def application_type_dist(filtered_data):
  data_application = pd.DataFrame(filtered_data['case:ApplicationType'].value_counts()).reset_index(drop = False)
  data_application.rename(columns = {'index':'ApplicationType', 'case:ApplicationType':'count'}, inplace = True)
  fig = px.pie(data_application, values='count', names='ApplicationType', title='Distribution of application type')
  return(fig)

"""#### Distribution of requested amount by applicant"""

def requested_amount_dist(filtered_data):
  data_box = pd.DataFrame(filtered_data['case:RequestedAmount'])
  fig = px.box(data_box, y="case:RequestedAmount")
  return(fig)

"""#### Distribution of loan given """


# create a list of our conditions
def loan_dist(filtered_data):
  loan_info = filtered_data.copy()
  conditions = [
      (loan_info['case:RequestedAmount'] == loan_info['FirstWithdrawalAmount']),
      (loan_info['case:RequestedAmount'] > loan_info['FirstWithdrawalAmount']),
      ((loan_info['case:RequestedAmount'] == 0) & (loan_info['FirstWithdrawalAmount'] > 0)),
      (loan_info['FirstWithdrawalAmount'] == 0),
      (loan_info['case:RequestedAmount'] < loan_info['FirstWithdrawalAmount'])]

  # create a list of the values we want to assign for each condition
  values = ['Full loan given', 'Partial loan given','No amount requested, but got loan', 'No loan given', 'Multiple Withdrawl amount']

  # create a new column and use np.select to assign values to it using our lists as arguments
  loan_info['Loan info'] = np.select(conditions, values)
  loan_info.loc[loan_info['FirstWithdrawalAmount'] == 0.0]
  loan_info.loc[loan_info["FirstWithdrawalAmount"] == 0.0, "Loan info"] = 'No loan given'

 
  data_loan_info = pd.DataFrame(loan_info['Loan info'].value_counts()).reset_index(drop = False)
  data_loan_info.rename(columns = {'index':'Loan info', 'Loan info':'count'}, inplace = True)
  fig = px.pie(data_loan_info, values='count', names='Loan info', title='Distribution of Loan given')
  return(fig)

"""### Process discovery

With Process discovery we aim to find a suitable process model that can describe our business process and the sequence of events (traces) and activities that are performed within each trace. In addition to discovery of process model we can get statistics related such as frequency of events and time-to-execute, which help increase our understanding of the insufficiences are inherited in our process.

#### Before applying one of the many process mining algorithms, it will be informatives if we get some statistics describing our log and process will start by understanding how many variants we have? how many cases in each variant?

A process variant is a unique path from the very beginning to the very end of the process
"""

def total_variants(event_log_data):
  variants = variants_filter.get_variants(event_log_data)
  return(len(variants))


"""If the case would have such a way, that any specific variant is very high in %, then it would have become an interesting story to look into"""

## Let's see what activities do we have in log? including their frequencies and considering all cases(no filter)
def activites_distribution(event_log_data):
  activities = attributes_filter.get_attribute_values(event_log_data, "concept:name")
  activities_dist = pd.DataFrame(activities.items(), columns= ['Activities', 'Counts'])
  activities_dist.sort_values(by=['Counts'], inplace=True, ascending = False)
  activities_dist['Activities_distribution'] = (activities_dist['Counts']/activities_dist['Counts'].sum())*100
  return(activities_dist)


"""Few activities stands out "W_Validate application", "W_Call after offers", "W_Call incomplete files" and "W_Complete application", they have a lot of actions, it could be some sort of self-loop or rework or some other reason ofc, but clearly we should do something to prevent them from becoming bottlenecks

### Dicision tree (RCA)

A decision tree about the duration of a case helps to understand the reasons behind an high case duration (or, at least, a case duration that is above the threshold).First, a log has to be loaded. A representation of a log on a given set of features could be obtained Or an automatic representation (automatic selection of the attributes) could be obtained:
data, feature_names = log_to_features.apply(log)
Then, the target classes are formed. There are two classes: First, traces that are below the specified threshold (here, 200 days). Note that the time is given in seconds. Second, traces that are above the specified threshold. The decision tree could be then calculated and visualized.
"""

def tree_visualizer_RCA(event_log_data):
  data, feature_names = log_to_features.apply(event_log_data,parameters={"str_tr_attr": ["LoanGoal","ApplicationType"],
                                                                      "str_ev_attr": ["concept:name","org:resource","Accepted	"],
                                                                      "num_tr_attr": ["RequestedAmount"],
                                                                      "num_ev_attr": ["MonthlyCost","CreditScore","OfferedAmount"]})
  for row_num in range(len(data)):
      row= data[row_num]
      row = [0 if math.isnan(x) else x for x in row]
      data[row_num] = row

  target, classes = get_class_representation.get_class_representation_by_trace_duration(event_log_data, 20 * 86400)
  clf = tree.DecisionTreeClassifier(max_depth=3)
  clf.fit(data, target)


  gviz = dectree_visualizer.apply(clf, feature_names, classes)
  return(gviz)


def RCA(event_log_data_csv):
  dataframe  = pd.read_csv(event_log_data_csv)
  dataframe = pm4py.format_dataframe(dataframe, case_id='case:concept:name', activity_key='concept:name', timestamp_key='time:timestamp')
  event_log = pm4py.convert_to_event_log(dataframe)
  loan_goal_distribution = loan_goal_dist(filtered_data(dataframe,'mean', 'sum'))
  application_type_distribution = application_type_dist(filtered_data(dataframe,'mean', 'sum'))
  requested_amount_distribution = requested_amount_dist(filtered_data(dataframe,'mean', 'sum'))
  loan_distribution = loan_dist(filtered_data(dataframe,'mean', 'sum'))
  #veriant_distributions = veriant_distribution(event_log).head()
  #activites_distributions = activites_distribution(event_log).head()
  tree_visualizer_RCA1 = tree_visualizer_RCA(event_log)# dectree_visualizer.view()
  return {'Loan-distribution':pio.to_json(loan_goal_distribution),
          'application_type_distribution': pio.to_json(application_type_distribution), 
          'requested_amount_distribution':pio.to_json(requested_amount_distribution), 
          'loan_distribution':pio.to_json(loan_distribution),
#           'tree_visualizer_RCA1':tree_visualizer_RCA1
         }


