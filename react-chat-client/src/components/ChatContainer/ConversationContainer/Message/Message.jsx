export default function Message(props) {
	return (
		<div
			className={`message${props.fromMe ? ' from-me' : ''}${
				props.pending ? ' pending' : ''
			}`}
			data-id={props.messageId || ''}
			data-sender-id={props.senderId || ''}
		>
			<div className="sender">{props.sender}</div>
			<div className="contents">{props.message}</div>
		</div>
	);
}
