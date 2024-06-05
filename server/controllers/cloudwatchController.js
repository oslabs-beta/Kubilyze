const AWS = require('aws-sdk');
const db = require('../models/userModel.js')

const cloudwatchController = {};



cloudwatchController.getNodeMetrics = async (clusterName, instanceId, nodeName, startdate) => {
  let secondsPassed = ((new Date() - new Date(startdate)) / 1000);
  let period = Math.round((secondsPassed / 2) / 60) * 60;
  //define params for cloudwatch api metric request
  const params = {
    MetricDataQueries: [
      {
        Id: 'm1',
        MetricStat: {
          Metric: {
            Namespace: 'ContainerInsights',
            MetricName: 'node_cpu_utilization',
            Dimensions: [
              { Name: 'ClusterName', Value: clusterName },
              { Name: 'InstanceId', Value: instanceId },
              { Name: 'NodeName', Value: nodeName },
            ],
          },
          Period: 12600, 
          Stat: 'Average',
        },
        ReturnData: true,
      },
      {
        Id: 'm2',
        MetricStat: {
          Metric: {
            Namespace: 'ContainerInsights',
            MetricName: 'node_memory_utilization',
            Dimensions: [
              { Name: 'ClusterName', Value: clusterName },
              { Name: 'InstanceId', Value: instanceId },
              { Name: 'NodeName', Value: nodeName },
            ],
          },
          Period: 12600, 
          Stat: 'Average',
        },
        ReturnData: true,
      },
      {
        Id: 'm3',
        MetricStat: {
          Metric: {
            Namespace: 'ContainerInsights',
            MetricName: 'node_number_of_running_pods',
            Dimensions: [
              { Name: 'ClusterName', Value: clusterName },
              { Name: 'InstanceId', Value: instanceId },
              { Name: 'NodeName', Value: nodeName },
            ],
          },
          Period: period, 
          Stat: 'Average',
        },
        ReturnData: true,
      },
    ],
    StartTime: new Date(Date.now() - 7 * 24 * 3600 * 1000), //Past 7 days
    EndTime: new Date(), // End time now
  };
  try {
    const {username} = req.body
    const user = await db.findOne({username})
    AWS.config.update({
     region: user.region,
     accessKeyId: user.accesskey,
     secretAccessKey: user.secretkey,
     sessionToken: user.sessiontoken
   });
    const cloudwatch = new AWS.CloudWatch()
    const data = await cloudwatch.getMetricData(params).promise();
    return data.MetricDataResults;
  } catch (err) {
    console.error('Error fetching CloudWatch metrics:', err);
    throw err;
  }
};


cloudwatchController.getAllPodMetrics = async (clusterName) => {
  const params = {
    MetricDataQueries: [
      {
        Id: 'm1',
        MetricStat: {
          Metric: {
            Namespace: 'ContainerInsights',
            MetricName: 'pod_cpu_utilization',
            Dimensions: [
              { Name: 'ClusterName', Value: clusterName },
              { Name: 'Namespace', Value: 'amazon-cloudwatch' },
              { Name: 'Service', Value: 'cloudwatch-agent' },
            ],
          },
          Period: 12600, 
          Stat: 'Average',
        },
        ReturnData: true,
      },
      {
        Id: 'm2',
        MetricStat: {
          Metric: {
            Namespace: 'ContainerInsights',
            MetricName: 'pod_memory_utilization',
            Dimensions: [
              { Name: 'ClusterName', Value: clusterName },
              { Name: 'Namespace', Value: 'amazon-cloudwatch' },
              { Name: 'Service', Value: 'cloudwatch-agent' },
            ],
          },
          Period: 12600, 
          Stat: 'Average',
        },
        ReturnData: true,
      },
    ],
    StartTime: new Date(Date.now() - 7 * 24 * 3600 * 1000), //Past 7 days
    EndTime: new Date(), // End time now
  };

  try {
    const {username} = req.body
    const user = await db.findOne({username})
    AWS.config.update({
     region: user.region,
     accessKeyId: user.accesskey,
     secretAccessKey: user.secretkey,
     sessionToken: user.sessiontoken
   });
    const cloudwatch = new AWS.CloudWatch()
    const data = await cloudwatch.getMetricData(params).promise();
    console.log('Metrics data:', JSON.stringify(data, null, 2));
    res.locals.metrics = data.MetricDataResults; // Save metrics in res.locals
    return next();
  } catch (err) {
    console.error('Error fetching metrics:', err);
    return next({ log: err, status: 500, message: 'Error fetching metrics' });
  }
};

module.exports = cloudwatchController;
// MAY 21
//Update time range to :
//       start time : since the first day the cluster was running
//       end time   : now

//           change : period to : two hour intervals
