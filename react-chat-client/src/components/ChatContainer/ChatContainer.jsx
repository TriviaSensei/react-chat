import './ChatContainer.css';
import ConversationContainer from './ConversationContainer/ConversationContainer';
import MessageSendContainer from './MessageSendContainer/MessageSendContainer';

export default function ChatContainer() {
	return (
		<div className="chat-container">
			<ConversationContainer />
			<MessageSendContainer />
		</div>
	);
}
