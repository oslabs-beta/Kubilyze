const AWS = require('aws-sdk');

console.log('AWS Access Key:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS Secret Key:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('AWS Region:', process.env.AWS_REGION);

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = AWS;
