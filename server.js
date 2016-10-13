var express = require('express');
var bing = require('node-bing-api');
var Dal = require('./dal.js');
var mongo = require('mongodb').MongoClient;

var bingApi = bing({ accKey: process.env.SEARCH_KEY });
var dal = new Dal(mongo, bingApi);
var path = process.cwd();

var app = express();

var port = process.env.PORT || 8080;
var connectionString = process.env.CONNECTION_STRING;

dal.connect(connectionString, function() {
    app.listen(port, function () {
        console.log('Example app listening on port ' + port);
    });
});

app.get('/favicon.ico', function (req, res) {
});

app.get('/api/imagesearch/*', function (req, res) {
    var searchRequest = req.params[0];
    var offset = req.query && req.query.offset ? +req.query.offset : 0;
    dal.search(searchRequest, offset, res);
    dal.saveRequestInHistory(searchRequest);
});

app.get('/api/latest/imagesearch/', function (req, res) {
    dal.getHistory(res);
});

app.get('/', function (req, res) {
    res.sendFile(path + '/public/index.html');
});