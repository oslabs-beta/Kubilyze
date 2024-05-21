const AWS = require('../../config/aws-config');
const cloudwatch = new AWS.CloudWatch({ region: process.env.AW_REGION });

const cloudwatchController = {};

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

module.exports = cloudwatchController;
