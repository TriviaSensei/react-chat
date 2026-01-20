import { io } from 'socket.io-client';

const URL =
	process.env.NODE_ENV === 'production'
		? 'http://react-chat-server.us-east-1.elasticbeanstalk.com/'
		: 'http://localhost:3000';

export const socket = io(URL);
