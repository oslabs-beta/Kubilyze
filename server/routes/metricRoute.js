const express = require('express');

const cloudwatch = require('../controllers/cloudwatchController');
const eks = require('../controllers/eksController');
const { newContexts } = require('@kubernetes/client-node/dist/config_types');

const metricsRouter = express.Router();

//Eks data
metricsRouter.get('/clusters', async (req, res, next) => {
  try {
    const clusters = await eks.describeClusters();
    res.json(clusters);
  } catch (err) {
    res.status(500).send('Error fetching clusters details');
  }
});

metricsRouter.get('/metrics/:clusterName', async (req, res, next) => {
  try {
    const metrics = await cloudwatch.getMetrics(req.params.clusterName);
    res.json(metrics);
  } catch (err) {
    next({ log: err });
    res.status(500).send('Error fetching metrics');
  }
});

module.exports = metricsRouter;
