var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname + '/../');

var NATS = require('nats');


app.get("/natscall",function(req,res){
	console.log("nats called");
	var nats = NATS.connect('nats://192.168.0.18:4222');
	var sid = nats.request('basicMath',"20", function(response) {
		console.log('Got a response in msg stream: ' + response);
		res.send(response);	
		nats.close();	
	});
});


app.get('*', function(req, res) { res.sendFile(rootPath + '/app/index.html'); });
app.listen(8000);
console.log("Listening on 8000");