const express = require('express');
const redis = require('redis');
const { promisify } = require('util');


const app = express(),
	  client = redis.createClient(process.env.REDIS_URL),
	  getAsync = promisify(client.get).bind(client);

const PORT = process.env.PORT || 3000;

client.on('error', function(err){
	console.error(`Error: ${err}`);
});


app.get('/', async function(req, res){
	let count = await getAsync('refresh_count');
	client.incr('refresh_count');
	res.send(`docker redis${count}`);
});

console.log(`start server at http://127.0.0.1:${PORT}`);
app.listen(PORT);
