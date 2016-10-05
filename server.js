var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/imagesearch/*', function (req, res) {
    var searchRequest = req.params[0];
    var offset = req.query.offset;
    console.log(offset)
    res.send('Hello World!');
});

app.get('/api/latest/imagesearch/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});