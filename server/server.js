//Boilerplate server file
const path = require('path');
const cors = require('cors');

require('dotenv').config();
const express = require('express');
const http = require('http')
const Sever = require("socket.io").Server;
const metricRouter = require('./routes/metricRoute');
const userRouter = require('./routes/userRoute.js')

const app = express();

app.use(cors());
app.use(express.json());

//Serve files
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api', metricRouter);
app.use('/user', userRouter);

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

const PORT = process.env.PORT || 3000
module.exports = app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);
