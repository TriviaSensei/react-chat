const { v4: uuidV4 } = require('uuid');

/**
 * {
 * 		name
 * 		socketId
 * 		userId
 * 		publicId
 * }
 */
const connectedUsers = [];

const socket = async (http, server) => {
	io = require('socket.io')(http, {
		cors: {
			origin: 'http://localhost:5173',
		},
	});

	const addNewUser = (socketId) => {
		const newId = uuidV4();
		const newPublicId = uuidV4();
		connectedUsers.push({
			socketId,
			userId: newId,
			publicId: newPublicId,
			name: '',
		});
		return newId;
	};

	io.on('connection', (socket) => {
		console.log(`A connection was made from ${socket.handshake.address}`);

		socket.join('chat-room');

		socket.on('request-new-user-id', (cb) => {
			const newId = uuidV4();
			connectedUsers.push({
				name: '',
				socketId: socket.id,
				userId: newId,
			});
			cb({ id: newId });
			console.log(connectedUsers);
		});

		socket.on('rejoin-server', (data, cb) => {
			//the user must send their ID - if not, generate a new user
			if (!data.id) {
				const newId = addNewUser(socket.id);
				return cb({ id: newId });
			}
			//the id was sent here - see if it matches something in the array
			else {
				//update the socket id if it matches something
				const user = connectedUsers.find((u) => {
					if (u.userId === data.id) {
						u.socketId = socket.id;
						return true;
					}
					return false;
				});
				//if not, make a new user for them
				if (!user) {
					const newId = addNewUser(socket.id);
					return cb({ id: newId });
				}
				return cb({ name: user.name });
			}
		});

		socket.on('set-name', (data, cb) => {
			console.log(data);
			if (!data.name)
				return cb({ status: 'error', message: 'You must enter a name' });
			else {
				const user = connectedUsers.find((u) => {
					if (u.socketId === socket.id) {
						u.name = data.name;
						return true;
					}
					return false;
				});
				if (!user) {
					const newId = addNewUser(socket.id);
					connectedUsers.find((u) => {
						if (u.socketId === socket.id) {
							u.name = data.name;
							return true;
						}
						return false;
					});
					return cb({
						id: newId,
						status: 'success',
						name: data.name,
					});
				}
				return cb({
					id: user.id,
					status: 'success',
					name: user.name,
				});
			}
		});

		socket.on('send-message', (data, cb) => {
			console.log(`New message`);
			const user = connectedUsers.find((u) => u.socketId === socket.id);
			if (!user) return cb({ status: 'fail', message: 'User not found' });
			cb({ status: 'success' });
			console.log(data);
			socket.to('chat-room').emit('new-message', {
				from: user.name,
				publicId: user.publicId,
				message: data.message,
			});
		});

		socket.on('disconnect', (reason) => {
			socket.leave('chat-room');
			console.log(
				`Client disconnected from ${socket.handshake.address} (${reason})`
			);
		});
	});

	io.listen(server);
};

module.exports = socket;
