//Boilerplate server file
const path = require('path');
const cors = require('cors');

require('dotenv').config();
const express = require('express');
const metricRouter = require('./routes/metricRoute');
const eksController = require('./controllers/eksController');
const cloudwatchController = require('./controllers/cloudwatchController');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

//Serve files
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api', metricRouter);

//Glolbal error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
