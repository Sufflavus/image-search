var express = require('express');
var app = express();
var Bing = require('node-bing-api')({ accKey: process.env.SEARCH_KEY }); // https://www.npmjs.com/package/node-bing-api

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/imagesearch/*', function (req, res) {
    var searchRequest = req.params[0];
    var offset = req.query && req.query.offset ? +req.query.offset : 0;
    console.log(process.env.SEARCH_KEY)
    Bing.images(searchRequest, { top: 10, skip: offset }, function(error, res, body){
      console.log(res);
    });
    res.send('Hello World!');
});

app.get('/api/latest/imagesearch/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});