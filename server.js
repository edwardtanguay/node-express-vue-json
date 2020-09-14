const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public/pages'));

const staticDirectory = path.join(__dirname, './public');
app.use(express.static(staticDirectory));

app.get('/', (req, res) => {
	res.render('index', { pageTitle: 'Flashcards' });
});

app.listen(port, () => {
	console.log('app running on port ' + port);
});

