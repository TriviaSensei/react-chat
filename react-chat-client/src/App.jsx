import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager/ConnectionManager';
import { Events } from './components/Events/Events';
import { MyForm } from './components/MyForm/MyForm';
import './App.css';

export default function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [fooEvents, setFooEvents] = useState([]);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onFooEvent(value) {
			setFooEvents((prev) => {
				return [...prev, value];
			});
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('foo', onFooEvent);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('foo', onFooEvent);
		};
	}, []);

	return (
		<div className="App">
			<ConnectionState isConnected={isConnected} />
			<Events events={fooEvents} />
			<ConnectionManager />
			<MyForm />
		</div>
	);
}
