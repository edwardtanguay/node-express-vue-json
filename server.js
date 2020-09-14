const express = require('express');
const path = require('path');

const Feedback = require('./src/itemTypes/Feedback');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public/pages'));

const staticDirectory = path.join(__dirname, './public');
app.use(express.static(staticDirectory));

app.get('/', (req, res) => {

	res.render('index', { pageTitle: 'Flashcards' });
});

app.post('/backend', async (req, res) => {
	const emulatedWaitSeconds = 0;

	const feedback = new Feedback();
	const data = {};
	data.message = 'fff';
	await feedback.addEntry('nnn', 'ttt', 'mmm');
	data.feedbacks = await feedback.getList();

	setTimeout(() => {
		res.send(JSON.stringify(data));
	}, emulatedWaitSeconds * 1000);
});

app.listen(port, () => {
	console.log('app running on port ' + port);
});

