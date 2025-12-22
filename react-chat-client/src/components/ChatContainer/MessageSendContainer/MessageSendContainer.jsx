import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './MessageSendContainer.css';
import { useState } from 'react';

export default function MessageSendContainer() {
	const { name, setName } = useContext(UserContext);
	const [message, setMessage] = useState('');

	const sendMessage = () => {
		setMessage('');
	};

	const sendMessageEnter = (e) => {
		if (e.key.toLowerCase() === 'enter') sendMessage();
	};

	return (
		<div className="message-send-container">
			<button
				className="name-button"
				onClick={() => setName('')}
			>{`${name}: `}</button>
			<input
				className="message-input"
				type="text"
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={sendMessageEnter}
				value={message}
			></input>
			<button className="send-button" onClick={sendMessage}>
				Send
			</button>
		</div>
	);
}
