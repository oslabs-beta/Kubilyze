//Boilerplate server file
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

//Serve files
app.use(express.static(path.resolve(__dirname, '../dist')));

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
