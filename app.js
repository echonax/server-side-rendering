
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

var mysql = require('mysql');

//session init
app.use( session({secret:'can',saveUninitialized:false,resave:false}) );
var sess;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.use( express.static(__dirname + '/client' ) );
//app.use(app.router);
//app.use(express.methodOverride());
/*app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/client'));
app.use(app.router);*/


//DB
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'can_schema',
    }
);

/*
var db = require('./daos.js');
var db = new db.db(connection);
*/
//PAGE MANAGER
var _HTML_GAME           		= fs.readFileSync('client/game.cec', 'UTF8');
var _HTML_GAME_HOME             = fs.readFileSync('client/content/home.cec', 'UTF8');


_HTML_GAME_HOME       		= _HTML_GAME.replace('%CONTENT%', _HTML_GAME_HOME);
//Routes
var Routes = require('./routes.js');
var r = new Routes(app,connection,sess, _HTML_GAME,_HTML_GAME_HOME);



//console.log("d.query  "+JSON.stringify(d.queryy));

app.listen(7000, function() { 
	console.log('listening')
});