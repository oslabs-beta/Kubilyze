const express = require('express');

// const cloudwatch = require('../controllers/cloudwatchController');
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

metricsRouter.get('/metrics/:clustername/allpods', async (req, res, next) => {
  try{
    const {clustername} = req.params;
    const metrics = await cloudwatch.getAllPodMetrics(clustername); //inside of controller save var 'metrics' in res.locals
    res.status(200).json(metrics); 
  } catch (err) {
    console.log('Error fetching metrics');
    next({log:err});
    res.status(500).send('Error fetching metrics');
  }
});


module.exports = metricsRouter;
/*
Updates : 

Line 10 - Cluster Metrics slide: for the bottom of the page (the node section) we have to use EKS/EC2 to get the necesary information for the componentss that display the nodes belonging to that cluster
        I need to fix route (use controllers on the middleware). This would require making minor adjustments to the controllers

        example : metricsRouter.get('/clusters', eks.describeClusters, eks.describeNodes (req, res, next) => {
          res.status(200).json(res.locals.metricsData);
        })

Line 12 - Node Metrics Slide: Same as 'Line 10' but for the pods 

*/



//first-cluster


//id
//i-09d10f65bb4092a9f

//ip-192-168-13-219.ec2.internal