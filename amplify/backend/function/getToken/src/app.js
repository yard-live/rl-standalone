/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
const request = require('request')
const fetch   = require('node-fetch');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *


app.get('/api/token', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/api/token/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/api/token', function(req, res) {
  const { roomName, isOwner } = req.body;
  // Add your code here
  var url = `${
    process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'
  }/meeting-tokens`;
  
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
    },
    body: JSON.stringify({
      properties: { room_name: roomName, is_owner: isOwner }
    }),
  };

  const response = await fetch(url, options)
  .then(res => res.json())
  .then(data => res.send(data))
  .catch(err => {
    res.json(500, {msg: 'Error!'});
    console.log(err);
    throw(err);
  });
  const data = await response.json();
});

app.post('/api/createRoom', function(req, res) {
  var url = `${
    process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'
  }/rooms`;

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
    },
    body: JSON.stringify({
      properties: { 
        exp: Math.round(Date.now() / 1000) + 60 * 60, // expire in 60 minutes
        eject_at_room_exp: true,
      },
    }),
  };

  const response = await fetch(url, options)
  .then(res => res.json())
  .then(data => res.send(data))
  .catch(err => {
    res.json(500, {msg: 'Error!'});
    console.log(err);
    throw(err);
  });
  const data = await response.json();
});

/****************************
* Example  method *

app.post('/api/token/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.put('/api/token', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/api/token/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});
****************************/
/****************************
* Example delete method *


app.delete('/api/token', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/api/token/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});
****************************/

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
