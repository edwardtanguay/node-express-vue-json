const express = require('express');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
	res.send('hello app');
});

app.listen(port, () => {
	console.log('app running on port ' + port);
});

