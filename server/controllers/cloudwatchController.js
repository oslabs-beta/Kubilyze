const AWS = require('../../config/aws-config');
const cloudwatch = new AWS.CloudWatch({ region: process.env.AW_REGION });

const cloudwatchController = {};

// // To Do: Delete this route. It is not needed. It only has been used for testing
// cloudwatchController.getMetrics = async (clusterName) => {
//   console.log(clusterName);
//   const params = {
//     MetricDataQueries: [
//       {
//         Id: 'm1',
//         MetricStat: {
//           Metric: {
//             Namespace: 'ContainerInsights',
//             MetricName: 'container_cpu_utilization',//dimensions : necesary information to 
//             Dimensions: [
//               {
//                 Name: 'ClusterName',
//                 Value: clusterName,
//               },
//             ],
//           },
//           Period: 60,
//           Stat: 'Average',
//         },
//         ReturnData: true,
//       },
//       {
//         Id: 'm2',
//         MetricStat: {
//           Metric: {
//             Namespace: 'ContainerInsights',
//             MetricName: 'container_memory_utilization',
//             Dimensions: [
//               {
//                 Name: 'ClusterName',
//                 Value: clusterName,
//               },
//             ],
//           },
//           Period: 60,
//           Stat: 'Average',
//         },
//         ReturnData: true,
//       },
//     ],
//     StartTime: new Date(new Date().getTime() - 3600 * 1000), // 1 hour ago
//     EndTime: new Date(),
//   };
//   try {
//     const data = await cloudwatch.getMetricData(params).promise();
//     return data.MetricDataResults;
//   } catch (err) {
//     console.error('Error fetching CloudWatch metrics:', err);
//     throw err;
//   }
// };

// // To Do: Delete this route. It is not needed. It only gets one node,it doesn't get all the node's metrics
// cloudwatchController.getNodeMetricsDepracated = async (clusterName) => {
//   const params = {
//     MetricDataQueries: [
//       {
//         Id: 'm1',
//         MetricStat: {
//           Metric: {
//             Namespace: 'ContainerInsights',
//             MetricName: 'node_cpu_utilization',
//             Dimensions: [
//               {
//                 Name: 'ClusterName',
//                 Value: clusterName,
//               },
//             ],
//           },
//           Period: 14400, // 4 hours
//           Stat: 'Average',
//         },
//         ReturnData: true,
//       },
//       {
//         Id: 'm2',
//         MetricStat: {
//           Metric: {
//             Namespace: 'ContainerInsights',
//             MetricName: 'node_memory_utilization',
//             Dimensions: [
//               {
//                 Name: 'ClusterName',
//                 Value: clusterName,
//               },
//             ],
//           },
//           Period: 14400, // 4 hours
//           Stat: 'Average',
//         },
//         ReturnData: true,
//       },
//       {
//         Id: 'm3',
//         MetricStat: {
//           Metric: {
//             Namespace: 'ContainerInsights',
//             MetricName: 'node_number_of_running_pods',
//             Dimensions: [
//               {
//                 Name: 'ClusterName',
//                 Value: clusterName,
//               },
//             ],
//           },
//           Period: 60,
//           Stat: 'Average',
//         },
//         ReturnData: true,
//       },
//     ],
//     StartTime: new Date(Date.now() - 24 * 3600 * 1000), // Start time 24 hours ago
//     EndTime: new Date(), // End time now
//   };

//   try {
//     const data = await cloudwatch.getMetricData(params).promise();
//     console.log('Metrics data:', JSON.stringify(data, null, 2));
//     return data.MetricDataResults;
//   } catch (err) {
//     console.error('Error fetching metrics:', err);
//     throw err;
//   }
// };

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
    const data = await cloudwatch.getMetricData(params).promise();
    // console.log('Metrics data:', JSON.stringify(data, null, 2));
    return data.MetricDataResults;
  } catch (err) {
    console.error('Error fetching metrics:', err);
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
    const data = await cloudwatch.getMetricData(params).promise();
    // console.log('Metrics data:', JSON.stringify(data, null, 2));
    return data.MetricDataResults;
  } catch (err) {
    console.error('Error fetching metrics:', err);
    throw err;
  }
};

module.exports = cloudwatchController;
// MAY 21
//Update time range to :
//       start time : since the first day the cluster was running
//       end time   : now

//           change : period to : two hour intervals
