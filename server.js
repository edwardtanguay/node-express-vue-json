const express = require('express');
const path = require('path');

const Flashcards = require('./src/itemTypes/flashcards');

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
	const emulatedWaitSeconds = 3;

	const flashcards = new Flashcards();
	const data = {};
	//await flashcards.addEntry('ccc', 'fff', 'bbb');
	data.flashcards = await flashcards.getAll();
	data.categories = await flashcards.getCategories();

	setTimeout(() => {
		res.send(JSON.stringify(data));
	}, emulatedWaitSeconds * 1000);
});

app.listen(port, () => {
	console.log('app running on port ' + port);
});

