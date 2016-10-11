var express = require('express');
var bing = require('node-bing-api');
var Dal = require('./dal.js');
var mongo = require('mongodb').MongoClient;

var bingApi = bing({ accKey: process.env.SEARCH_KEY });
var dal = new Dal(mongo, bingApi);

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/imagesearch/*', function (req, res) {
    var searchRequest = req.params[0];
    var offset = req.query && req.query.offset ? +req.query.offset : 0;
    console.log(searchRequest)
    bingApi.images(searchRequest, { top: 10, skip: offset }, function(error, response, body) {
      var results = body.d.results.map(function(image) {
        return {
          "url": image.MediaUrl,
          "snippet": image.Title,
          "thumbnail": image.Thumbnail.MediaUrl,
          "context": image.SourceUrl
        };
      });
      res.json(results);
    });
});

app.get('/api/latest/imagesearch/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});