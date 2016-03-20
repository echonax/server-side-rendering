module.exports = function(app, session, io, client, redis, gamePage, gamePageHome){
    var sess;
	//THE DATA
	var userInitData = {
		'cMessage':{
			userName:'',
			data:[
				{
					name:'',
					postpone:'',
					startTimes:'',
					endTimes:'',
					days:''
				},
				{
					name:'',
					postpone:'',
					startTimes:'',
					endTimes:'',
					days:''
				},
				{
					name:'',
					postpone:'',
					startTimes:'',
					endTimes:'',
					days:''
				},
				{
					name:'',
					postpone:'',
					startTimes:'',
					endTimes:'',
					days:''
				},
				{
					name:'',
					postpone:'',
					startTimes:'',
					endTimes:'',
					days:''
				},
				{
					name:'',
					postpone:'',
					startTimes:'',
					endTimes:'',
					days:''
				},
				{
					name:'',
					postpone:'',
					startTimes:'',
					endTimes:'',
					days:''
				},
				{
					name:'',
					postpone:'',
					startTimes:'',
					endTimes:'',
					days:''
				}
			]
		},
		'vMessage':''
	};


	app.get('/', function(req, res) {

		sess = req.session;

		if(sess.username){
			res.redirect('/event');
		}else{
			res.render('main.html');
		}

	});
    
    app.get('/getCurrentUserData', function(req, res){
        res.send(userInitData);
    });


	app.post('/login', function(req, res) {

		sess = req.session;
		sess.username = req.body.user;
		var user_name=req.body.user;
		var password=req.body.password;

		console.log('Checking db for rpi id = '+user_name+' and password = '+password);
		// C part ;)
		client.get("cMessage_" + user_name, function(error,value){

			if(error){
				console.log("error getting val", error);
			}
			console.log("cMessage_" + user_name, value);
			var parsedValue = JSON.parse(value);

			if(parsedValue != null){
				userInitData.cMessage = parsedValue;}

			userInitData.cMessage.userName = user_name;

		});
		//V part
		//want randomSequenceId's all data
		var randomSequenceId = Math.floor((Math.random() * 9000) + 1000);
		client.publish("123456789_REQUEST", randomSequenceId + ' SOCKET GET ALL CURRENT_STATE',function(){console.log('publish cb');});
		//subscribe in order to listen the response for that rpi_id with randomSequenceId
		client.subscribe('123456789_REPLY');
		//if that message ever arrives from volcano check the rpi_id und randomSequenceId
		client.on("message", function (channel, message) {
			var msgArray = message.split(' ');
			var rpi_id = msgArray[0];
			console.log("client channel " + channel + ": " + message);
			userInitData.vMessage = message;
			if(rpi_id == randomSequenceId){
				res.end("yes");
			}else{
				//change this to no for prod******************************
				res.end("yes");
			}
			client.unsubscribe("123456789_REPLY");
		});
		
	});


	app.get('/home', function(req, res) {
			sess = req.session;
			console.log("inside get home")
			if(sess.username){
				res.send(gamePageHome);
                console.log(JSON.stringify(userInitData));
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

	app.post('/socketDataSave',function(req,res){
		console.log('boday \n'+ JSON.stringify(req.body));
        //set on redis
		client.set("cMessage_" + req.body.userName, JSON.stringify(req.body) , redis.print);
        //set locally
        userInitData.cMessage = req.body;
        res.sendStatus(200);
	});


	client.on('error', function(error){
		console.log('error, ' + error);
	});

}