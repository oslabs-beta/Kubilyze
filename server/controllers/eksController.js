const AWS = require('../../config/aws-config');
const eks = new AWS.EKS();

const eksController = {};

eksController.describeClusters = async () => {
  try {
    const data = await eks.listClusters().promise();
    const clusterNames = data.clusters;

    // Fetch detailed information for each cluster
    const clusterDetailsPromises = clusterNames.map((clusterName) =>
      eks.describeCluster({ name: clusterName }).promise()
    );

    const clusterDetails = await Promise.all(clusterDetailsPromises);

    // Extract pertinent details
    const clustersInfo = clusterDetails.map((cluster) => {
      const clusterInfo = cluster.cluster;
      return {
        name: clusterInfo.name,
        status: clusterInfo.status,
        version: clusterInfo.version,
        createdAt: clusterInfo.createdAt,
        tags: clusterInfo.tags,
        health: clusterInfo.health,
      };
    });

    return clustersInfo;
  } catch (err) {
    console.error('Error fetching cluster details:', err);
    throw err;
  }
};

module.exports = eksController;
