const mongoose = require('mongoose');

const startDB = database => {
	let uri = process.env.MONGODB_URI || `mongodb://192.168.99.100:32768/${database}`;
	mongoose.connect(uri);
};

module.exports = startDB;
