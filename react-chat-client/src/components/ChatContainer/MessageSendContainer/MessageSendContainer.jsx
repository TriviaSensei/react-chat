import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { MessagesContext } from '../../../contexts/MessagesContext';
import './MessageSendContainer.css';
import { useState } from 'react';
import { socket } from '../../../socket';

export default function MessageSendContainer() {
	const { name, setName } = useContext(UserContext);
	const [message, setMessage] = useState('');
	const { messages, setMessages } = useContext(MessagesContext);
	const sendMessage = () => {
		if (message.trim().length === 0) return;
		const newMessageId = `${Date.now()}${Math.floor(Math.random() * 1000000)}`;
		const newMessage = {
			sender: name,
			fromMe: true,
			pending: true,
			text: message,
			id: newMessageId,
		};
		setMessages([...messages, newMessage]);
		socket.emit('send-message', { message }, (data) => {
			if (data.status !== 'success')
				setMessages(messages.filter((msg) => msg.id !== newMessageId));
			else {
				const msg = messages.find((msg) => msg.id === newMessageId);
				if (!msg)
					setMessages([
						...messages,
						{
							...newMessage,
							pending: false,
						},
					]);
				else {
					setMessages(
						messages.map((msg) => {
							if (msg.id === newMessageId)
								return {
									...msg,
									pending: false,
								};
							return msg;
						})
					);
				}
			}
		});
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
