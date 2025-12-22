const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});

const http = require('http').Server(app);
// const socketManager = require('./mvc/utils/socketManager')(http, server);
const socketManager = require('./socketManager')(http, server);
app.get('/api', (req, res) => {
	res.status(200).json({
		status: 'OK',
		data: {
			message: 'Hello!',
		},
	});
});
