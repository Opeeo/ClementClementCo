//Imports 
var express = require('express');

//Instatiation server

var server = express();

//Config route

server.get('/', function(req, res) {

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("<h1>Default way API</h1>")

});

//Launch Server

server.listen(8080, function() {
    console.log('Server listening ...')
});