const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Flashcards {
	constructor() {
		this.datafile = path.join(__dirname, '../data/flashcards.json')
	}

	async addEntry(category, front, back) {
		const data = await this.getAll();
		data.unshift({ category, front, back });
		return writeFile(this.datafile, JSON.stringify(data));
	}

	async getCategories() {
		const items = await this.getAll();
		const allCategories = items.map(m => m.category);
		const uniqueCategories = [...new Set(allCategories)];
		const sortedUniqueCategories = uniqueCategories.sort((a, b) => {
			if (a.toLowerCase() < b.toLowerCase()) return -1;
			if (a.toLowerCase() > b.toLowerCase()) return 1;
			return 0;
		});

		const categoryItems = [];
		sortedUniqueCategories.forEach(name => {
			categoryItems.push({ name: name, count: 0 });
		});
		return categoryItems;
	}

	async getAll() {
		const data = await readFile(this.datafile, 'utf8');
		if (!data) return [];
		return JSON.parse(data);
	}
}

module.exports = Flashcards;
