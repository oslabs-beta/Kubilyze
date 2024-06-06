//Boilerplate server file
const path = require('path');
const cors = require('cors');

const serverless = require('serverless-http');
require('dotenv').config();
const express = require('express');
const metricRouter = require('./routes/metricRoute');
const userRouter = require('./routes/userRoute.js');
const Server = require('socket.io').Server;
const http = require('htttp');

const app = express();
const port = process.env.port || 3000;
const server = http.createserver(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

// app.use(cors());
app.use(express.json());

//Serve files
app.use(express.static(path.resolve(__dirname, '../dist')));




// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist', 'index.html'));
// });

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

server.listen(port, () =>
  console.log(`Listening on port ${port}`)
);


