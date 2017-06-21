const mongoose = require('mongoose');

const startDB = database => {
	if (!process.env.MONGODB_URI) {
		const creds = require('../creds/creds');
		if (database === 'tic-tac-toe')
			mongoose.connect(
				`mongodb://${creds.user}:${creds.pwd}@localhost/${database}?authSource=${creds.authSource}`
			);
		mongoose.connection
			.once('open', () => console.log('MongoDB Connected'))
			.on('error', error => {
				console.warn('Warning', error);
			});
	} else {
		mongoose.connect(process.env.MONGODB_URI);
	}
};

module.exports = startDB;
