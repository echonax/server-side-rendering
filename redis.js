module.exports = function(client, redis){


client.on('error', function(error){
	console.log('error, ' + error);
});


client.set('can', 'get;rpi_id;can;true;10;10;10;123;', redis.print);

client.get('can', function(error,value){

	if(error){
		console.log("error getting val", error);
	}
	console.log("3", value);
});


var id = 5;
client.publish("volkan", '1234 SOCKET GET ALL CURRENT_STATE');


client.on("subscribe", function (channel, count) {

});

client.on("message", function (channel, message) {
    console.log("client channel " + channel + ": " + message);
    
});
client.subscribe('volkan');
}