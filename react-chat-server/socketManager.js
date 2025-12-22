const { v4: uuidV4 } = require('uuid');

/**
 * {
 * 		name
 * 		socketID
 * 		userId
 * }
 */
const connectedUsers = [];

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
		});

		socket.on('disconnect', (reason) => {
			console.log(
				`Client disconnected from ${socket.handshake.address} (${reason})`
			);
		});
	});

	io.listen(server);
};

module.exports = socket;
