module.exports = function(app, session, io, client, redis, gamePage, gamePageHome){
    var sess;

	var userInitData = {};

	io.on('connection', function(socket){
		console.log("Server connection.io");
		socket.emit('socketData',userInitData);
	});

	io.on('disconnect', function(socket){
		console.log("client dcd");
	});

	io.on('socketSave', function(socket){
		console.log(socket);
		//client.set('can', 'get;rpi_id;0;can;true;10;10:30;11:39;123;15:30;15:40;5', redis.print);
	});
	

	app.get('/', function(req, res) {

		sess = req.session;

		if(sess.username){
			res.redirect('/event');
		}else{
			res.render('main.html');
		}

	});


	app.post('/login', function(req, res) {

		sess = req.session;
		sess.username = req.body.user;
		var user_name=req.body.user;
		var password=req.body.password;

		console.log('Checking db for username = '+user_name+' and password = '+password);
		res.end("yes");
		client.publish("123456789_REQUEST", '1234 SOCKET GET ALL CURRENT_STATE');
		client.subscribe('123456789_REPLY');
		
	});


	app.get('/home', function(req, res) {
			sess = req.session;
			console.log("inside get home")
			if(sess.username){
				res.send(gamePageHome);
			}else{
				//this can be replaced with a page
				res.write('<h1>Please login first.</h1>');
				res.end('<a href='+'/'+'>Login</a>');
			}
			
		});


	app.get('/logout',function(req,res){

		req.session.destroy(function(err){
			if(err){
				console.log("sess destroy error: "+err);
			}else{
				res.redirect('/');
			}
		});
	});

	
	

	
	client.on("message", function (channel, message) {
    	console.log("client channel " + channel + ": " + message);
    
	});
	

	app.post('/socketNameSave',function(req,res){
		var obj = req.body;
		console.log( obj[0] );
		userInitData = obj[0];
		client.set('can', obj[0] , redis.print);
	});


	client.on('error', function(error){
		console.log('error, ' + error);
	});


    client.set('soketName', 'get;rpi_id;0;can;true;10;10:30;11:39;123;15:30;15:40;5', redis.print);
	client.set('soketState', '1234 SOCKET INFO A {F_ON,F_OFF,J_ON,J_OFF,F_OFF,F_OFF,F_OFF,F_OFF}', redis.print);
    //123456789_REPLY: 1234 SOCKET INFO A {F_ON,F_OFF,J_ON,J_OFF,F_OFF,F_OFF,F_OFF,F_OFF}
	client.get('soketState', function(error,value){

		if(error){
			console.log("error getting val", error);
		}
		console.log('2', value);

		userInitData = value;
	});
    
    client.get('soketName', function(error,value){

		if(error){
			console.log("error getting val", error);
		}
		console.log('2', value);

	});



}