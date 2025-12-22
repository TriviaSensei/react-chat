const socket = async (http, server) => {
	io = require('socket.io')(http, {
		cors: {
			origin: 'http://localhost:5173',
		},
	});

	io.on('connection', async (socket) => {
		console.log(`A connection was made from ${socket.handshake.address}`);
		socket.on('create-something', (data, cb) => {
			console.log(data);
			cb('created something');
		});

		socket.on('disconnect', (reason) => {
			console.log(reason);
		});
	});

	io.listen(server);
};

module.exports = socket;
