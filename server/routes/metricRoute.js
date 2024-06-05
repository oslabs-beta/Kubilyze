const express = require('express');
const eks = require('../controllers/eksController');
const cloudwatchController = require('../controllers/cloudwatchController');
const metricsRouter = express.Router();

// Cluster Metrics Slide : from EKS Controllers
metricsRouter.post('/clusters',eks.describeClusters, eks.describeNodes, (req, res) => {
    res.status(200).json({
      clusters: res.locals.clusterInfo,
      nodes: res.locals.nodeGroupsDetails,
    });
  }
);

// Node Metrics Slide : from Cloudwatch Controllers
metricsRouter.post('/metrics/:clustername/:instanceId/:nodeName/:startdate', cloudwatchController.getNodeMetrics, (req, res, next) => {
  const metrics = res.locals.metrics;
  res.status(200).json(metrics);
});
//create route based on nodeID

metricsRouter.post('/metrics/:clustername/allpods', cloudwatchController.getAllPodMetrics, (req, res, next) => {
  const metrics = res.locals.metrics;
  res.status(200).json(metrics);
});


module.exports = metricsRouter;
