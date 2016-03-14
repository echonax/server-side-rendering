var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require("fs");

var io = require('socket.io')(server,{log:false});

var redis = require('redis');
var client = redis.createClient(80,'ec2-52-29-153-23.eu-central-1.compute.amazonaws.com');
client.auth('avatli21');

server.listen(7000, function() {
	console.log('listening')
});
//session init
app.use( session({secret:'can',saveUninitialized:false,resave:false}) );
var sess;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.use( express.static(__dirname + '/client' ) );

//PAGE MANAGER
var _HTML_GAME           		= fs.readFileSync('client/game.cec', 'UTF8');
var _HTML_GAME_HOME             = fs.readFileSync('client/content/home.cec', 'UTF8');


_HTML_GAME_HOME       		= _HTML_GAME.replace('%CONTENT%', _HTML_GAME_HOME);

//Routes
var Routes = require('./routes.js');
var r = new Routes(app, sess, io, client, redis,  _HTML_GAME,_HTML_GAME_HOME);
//Redis
var Redis = require('./redis.js');
//var re = new Redis(client, redis);


