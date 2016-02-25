module.exports.db = function(connection){

  connection.connect();

  var queryy = connection.query(
    'SELECT * FROM account',function(err,result,fields){
      if(err){ 
        throw err
      }else{
        //need input callback callback(result[0]);
        console.log('result',result);
      }
    });


  connection.end();
}

//open workbench root localhost 3306 port stuff a bug was to start this as a service from configs