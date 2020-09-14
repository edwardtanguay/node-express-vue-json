const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FeedbackService {
	constructor() {
		this.datafile = path.join(__dirname, '../data/feedback.json')
	}

	async addEntry(name, title, message) {
		const data = await this.getData();
		data.unshift({ name, title, message });
		return writeFile(this.datafile, JSON.stringify(data));
	}

	async getList() {
		const data = await this.getData();
		return data;
	}

	async getData() {
		const data = await readFile(this.datafile, 'utf8');
		if (!data) return [];
		return JSON.parse(data);
	}
}

module.exports = FeedbackService;
