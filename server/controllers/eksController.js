const { node } = require('webpack');
const AWS = require('../../config/aws-config');
const eks = new AWS.EKS();
const ec2 = new AWS.EC2();
const autoscaling = new AWS.AutoScaling();

const eksController = {};

eksController.describeClusters = async (req, res, next) => {
  try {
    const data = await eks.listClusters().promise();
    const clusterNames = data.clusters;

    // Fetch detailed information for each cluster
    const clusterDetailsPromises = clusterNames.map(async (clusterName) => {
      const clusterData = await eks
        .describeCluster({ name: clusterName })
        .promise();
      const nodeGroupsData = await eks
        .listNodegroups({ clusterName })
        .promise();
      const nodeGroupNames = nodeGroupsData.nodegroups;

      // Extract pertinent details
      return {
        name: clusterData.cluster.name,
        status: clusterData.cluster.status,
        version: clusterData.cluster.version,
        createdAt: clusterData.cluster.createdAt,
        tags: clusterData.cluster.tags,
        health: clusterData.cluster.health,
        nodeGroupNames: nodeGroupNames,
      };
    });

    // Wait for all promises to resolve
    const clustersInfo = await Promise.all(clusterDetailsPromises);

    // Set the locals and proceed
    res.locals.clusterInfo = clustersInfo;
    next();
  } catch (err) {
    console.error('Error fetching cluster details:', err);
    next(err); // Call next with error to handle it properly
  }
};

eksController.describeNodes = async (req, res, next) => {
  try {
    const nodeGroupsDetailsPromises = res.locals.clusterInfo.flatMap(
      (cluster) =>
        cluster.nodeGroupNames.map(async (nodeGroupName) => {
          const clusterName = cluster.name;
          const nodeGroupData = await eks
            .describeNodegroup({ clusterName, nodegroupName: nodeGroupName })
            .promise();
          const autoScalingGroupName =
            nodeGroupData.nodegroup.resources.autoScalingGroups[0].name;

          // List instances in the Auto Scaling group
          const autoScalingGroupData = await autoscaling
            .describeAutoScalingGroups({
              AutoScalingGroupNames: [autoScalingGroupName],
            })
            .promise();

          const instanceIds =
            autoScalingGroupData.AutoScalingGroups[0].Instances.map(
              (instance) => instance.InstanceId
            );

          // Fetch detailed information for each instance
          const instanceData = await ec2
            .describeInstances({
              InstanceIds: instanceIds,
            })
            .promise();

          const nodesInfo = instanceData.Reservations.flatMap((reservation) =>
            reservation.Instances.map((instance) => ({
              instanceId: instance.InstanceId,
              name: instance.PrivateDnsName || 'Unnamed',
              state: instance.State.Name,
              launchTime: instance.LaunchTime,
            }))
          );

          return {
            clusterName,
            nodeGroupName: nodeGroupData.nodegroup.nodegroupName,
            nodes: nodesInfo,
          };
        })
    );

    const nodeGroupsDetails = await Promise.all(nodeGroupsDetailsPromises);

    // Store the node group details in res.locals
    res.locals.nodeGroupsDetails = nodeGroupsDetails;
    next();
  } catch (err) {
    console.error('Error fetching node details:', err);
    next(err); // Pass the error to the next middleware
  }
};

module.exports = eksController;

//VERIFY : can I get the node name here without having to make another request
