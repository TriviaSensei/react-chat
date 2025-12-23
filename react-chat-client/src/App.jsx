import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import NameForm from './components/NameForm/NameForm';
import ChatContainer from './components/ChatContainer/ChatContainer';
import { UserContext } from './contexts/UserContext';
import { MessagesContext } from './contexts/MessagesContext';
import { ConnectionState } from './components/ConnectionState/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager/ConnectionManager';
import { Events } from './components/Events/Events';
import { MyForm } from './components/MyForm/MyForm';
import './App.css';

const lsItem = 'react-chat-id';

export default function App() {
	const [name, setName] = useState('');
	const [messages, setMessages] = useState([]);

	const [isConnected, setIsConnected] = useState(socket.connected);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
			let userId = localStorage.getItem(lsItem);
			if (!userId) {
				socket.emit('request-new-user-id', (data) => {
					localStorage.setItem(lsItem, data.id);
				});
			} else {
				socket.emit('rejoin-server', { id: userId }, (data) => {
					if (data.name) setName(data.name);
					else if (data.id) {
						localStorage.setItem(lsItem, data.id);
						setName('');
					}
				});
			}
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onMessage(data) {
			const newMessage = {
				sender: data.from,
				fromMe: false,
				pending: false,
				senderId: data.publicId,
				text: data.message,
			};
			setMessages((prev) => {
				return [...prev, newMessage];
			});
		}

		function onSetName(data) {
			setMessages((prev) => {
				return prev.map((msg) => {
					if (msg.senderId === data.publicId)
						return {
							...msg,
							sender: data.name,
						};
					return msg;
				});
			});
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('new-message', onMessage);
		socket.on('set-name', onSetName);
		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('new-message', onMessage);
			socket.off('set-name', onSetName);
		};
	}, []);

	// return (
	// 	<div className="App">
	// 		<ConnectionState isConnected={isConnected} />
	// 		<Events events={fooEvents} />
	// 		<ConnectionManager />
	// 		<MyForm />
	// 	</div>
	// );

	return (
		<UserContext value={{ name, setName }}>
			<MessagesContext value={{ messages, setMessages }}>
				<div className="App">{name ? <ChatContainer /> : <NameForm />}</div>
			</MessagesContext>
		</UserContext>
	);
}
