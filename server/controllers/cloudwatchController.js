const AWS = require('../../config/aws-config');
const cloudwatch = new AWS.CloudWatch({ region: process.env.AW_REGION });

const cloudwatchController = {};

// To Do: Delete this route. It is not needed. It only has been used for testing
cloudwatchController.getMetrics = async (clusterName) => {
  console.log(clusterName);
  const params = {
    MetricDataQueries: [
      {
        Id: 'm1',
        MetricStat: {
          Metric: {
            Namespace: 'ContainerInsights',
            MetricName: 'container_cpu_utilization',
            Dimensions: [
              {
                Name: 'ClusterName',
                Value: clusterName,
              },
            ],
          },
          Period: 60,
          Stat: 'Average',
        },
        ReturnData: true,
      },
      {
        Id: 'm2',
        MetricStat: {
          Metric: {
            Namespace: 'ContainerInsights',
            MetricName: 'container_memory_utilization',
            Dimensions: [
              {
                Name: 'ClusterName',
                Value: clusterName,
              },
            ],
          },
          Period: 60,
          Stat: 'Average',
        },
        ReturnData: true,
      },
    ],
    StartTime: new Date(new Date().getTime() - 3600 * 1000), // 1 hour ago
    EndTime: new Date(),
  };
  try {
    const data = await cloudwatch.getMetricData(params).promise();
    return data.MetricDataResults;
  } catch (err) {
    console.error('Error fetching CloudWatch metrics:', err);
    throw err;
  }
};

cloudwatchController.getNodeMetrics = async (req, res, next) => {
  const { clustername, instanceId, nodeName } = req.params;

  const params = {
    MetricDataQueries: [
      {
        Id: 'm1',
        MetricStat: {
          Metric: {
            Namespace: 'ContainerInsights',
            MetricName: 'node_cpu_utilization',
            Dimensions: [
              { Name: 'ClusterName', Value: clustername },
              { Name: 'InstanceId', Value: instanceId },
              { Name: 'NodeName', Value: nodeName },
            ],
          },
          Period: 300, // 5 minutes period
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
              { Name: 'ClusterName', Value: clustername },
              { Name: 'InstanceId', Value: instanceId },
              { Name: 'NodeName', Value: nodeName },
            ],
          },
          Period: 300, // 5 minutes period
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
              { Name: 'ClusterName', Value: clustername },
              { Name: 'InstanceId', Value: instanceId },
              { Name: 'NodeName', Value: nodeName },
            ],
          },
          Period: 300, // 5 minutes period
          Stat: 'Average',
        },
        ReturnData: true,
      },
    ],
    StartTime: new Date(Date.now() - 7 * 24 * 3600 * 1000), // Start time 7 days ago
    EndTime: new Date(), // End time now
  };

  try {
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
