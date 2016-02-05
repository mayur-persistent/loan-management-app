/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
  app       = express(),
  vcapServices = require('vcap_services'),
  bluemix   = require('./config/bluemix'),
  extend    = require('util')._extend,
  watson    = require('watson-developer-cloud');

var tradeoffAnalyticsCredentials = extend({
  version: 'v1',
  url: '<url>',
  username: '<username>',
  password: '<password>'
}, bluemix.getServiceCreds('tradeoff_analytics')); // VCAP_SERVICES

// Create the service wrapper
var tradeoffAnalytics = watson.tradeoff_analytics(tradeoffAnalyticsCredentials);
// Bootstrap application settings
require('./config/express')(app);

// Create the tone analyser service wrapper
var credentials = extend({
  version: 'v2-experimental',
  username: '<username>',//
  password: '<password>'//
}, bluemix.getServiceCreds('tone_analyzer'));



var toneAnalyzer = watson.tone_analyzer(credentials);
// Create the speech to text service wrapper
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: '<username>',
  password: '<password>'
}, vcapServices.getCredentials('speech_to_text'));

var authService = watson.authorization(config);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// render index page
app.get('/', function(req, res) {
  res.render('index', { ct: req._csrfToken });
});

app.post('/tone', function(req, res, next) {
  toneAnalyzer.tone(req.body, function(err, data) {
    if (err)
      return next(err);
    else
      return res.json(data);
  });
});


app.get('/synonyms', function(req, res, next) {
  toneAnalyzer.synonym(req.query, function(err, data) {
    if (err)
      return next(err);
    else
      return res.json(data);
  });
});


// Get token using your credentials
app.get('/api/token', function(req, res, next) {
  authService.getToken({url: config.url}, function(err, token) {
    if (err)
      next(err);
    else
      res.send(token);
  });
});
app.post('/demo/dilemmas/', function(req, res) {
  var params = extend(req.body);
  params.metadata_header = getMetadata(req);
  
  tradeoffAnalytics.dilemmas(params, function(err, dilemma) {
    if (err) 
      return res.status(Number(err.code) || 502).send(err.error || err.message || 'Error processing the request');
    else
      return res.json(dilemma);
  });
});

app.post('/demo/events/', function(req, res) {
  var params = extend(req.body);
  params.metadata_header = getMetadata(req);
  
  tradeoffAnalytics.events(params, function(err) {
    if (err)
      return res.status(Number(err.code) || 502).send(err.error || err.message || 'Error forwarding events');
    else
      return res.send();
  });
});

function getMetadata(req) {
	var metadata = req.header('x-watson-metadata');
	if (metadata) {
		metadata += "client-ip:" + req.ip;
	}
	return metadata;
}
// error-handler settings
require('./config/error-handler')(app);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
