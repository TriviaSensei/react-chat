import Message from './Message/Message';
import { useContext, useEffect } from 'react';
import { MessagesContext } from '../../../contexts/MessagesContext';
export default function ConversationContainer() {
	const { messages, setMessages } = useContext(MessagesContext);
	useEffect(() => {
		const cb = document.querySelector('#chat-bottom');
		if (cb) cb.scrollIntoView({ behavior: 'smooth' });
	});

	return (
		<div className="conversation-container">
			<div className="conversation-inner">
				{messages.map((msg, i) => {
					return (
						<Message
							key={i}
							pending={msg.pending}
							sender={msg.sender}
							fromMe={msg.fromMe}
							message={msg.text}
							messageId={msg.id || ''}
							senderId={msg.senderId || ''}
						></Message>
					);
				})}
				<div id="chat-bottom"></div>
			</div>
		</div>
	);
}
