const express = require('express');
const server = express();
const port = 3001;

server.get('/', (req, res) => {
	res.send('hello app');
});

server.listen(port, () => {
	console.log('app running on port ' + port);
});

