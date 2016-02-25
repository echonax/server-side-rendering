module.exports = function(app,connection,session,gamePage,gamePageHome,gamePageTopology){

	var sess;
	

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


		var userQuery = connection.query('SELECT * FROM account where username = ' + connection.escape(user_name));
			userQuery.on('error', function(err) {
				console.log('error: '+err)
 				res.end("no");
			}).on('result', function(row) {
			    res.end("yes");
			    console.log("therow->" + JSON.stringify(row) );
			}).on('end', function(err) {
			  	console.log('in end');
			});
        //need input callback callback(result[0]);
        //console.log('/event result' + result);
    	
		//connection.end();
		
	});

	app.get('/user', function(req,res) {

		sess=req.session;
		var user_name=sess.username;
		console.log('Checking db for username = '+user_name);
		var myrow;
		var userQuery = connection.query('SELECT * FROM account where username = ' + connection.escape(user_name));
			userQuery.on('error', function(err) {
				console.log('error: '+err)
 				res.end("no");
			}).on('result', function(row) {
				myrow=JSON.stringify(row);
			    res.end(myrow);
			    console.log("therow->" + myrow );
			    
			}).on('end', function(err) {
			  	console.log('in end');
			});
	});

	app.get('/event', function(req, res) {
		sess = req.session;
		console.log("inside get")
		if(sess.username){
			res.redirect('/event.html');
		}else{
			//this can be replaced with a page
			res.write('<h1>Please login first.</h1>');
			res.end('<a href='+'/'+'>Login</a>');
		}
	});

	app.get('/home', function(req, res) {
			sess = req.session;
			console.log("inside get home")
			if(sess.username){
				res.send(gamePageHome);
				//res.redirect('/game.html');
			}else{
				//this can be replaced with a page
				res.write('<h1>Please login first.</h1>');
				res.end('<a href='+'/'+'>Login</a>');
			}
			
		});

	app.get('/routes', function(req, res) {
			sess = req.session;
			console.log("inside get home")
			if(sess.username){
				res.send(gamePageTopology);
				//res.redirect('/game.html');
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

	


}