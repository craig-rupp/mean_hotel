var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dburl = 'mongodb://localhost:27017/meanHotel';

mongoose.connect(dburl);

mongoose.connection.on('connected', function () {
	console.log(`Mongoose connected to ${dburl}`);
});

mongoose.connection.on('disconnected', function () {
	console.log(`Mongoose disconnected`);
});

mongoose.connection.on('error', function (err) {
	console.log(`Mongoose connection error ${err}`);
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose terminated through app disconnection (SIGINT)');
		process.exit(0);
	});
});

process.on('SIGTERM', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose terminated through app disconnection (SIGTERM)');
		process.exit(0);
	});
});

process.once('SIGUSR2', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose terminated through app disconnection (SIGUSR2)');
		process.kill(process.pid, 'SIGUSR2');
	});
});

//BRING IN SCHEMA & MODELS
require('./hotels.model.js');
require('./users.model.js');