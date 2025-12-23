import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
export default function Message(props) {
	const { name } = useContext(UserContext);
	return (
		<div
			className={`message${props.fromMe ? ' from-me' : ''}${
				props.pending ? ' pending' : ''
			}`}
			data-id={props.messageId || ''}
			data-sender-id={props.senderId || ''}
		>
			<div className="sender">{props.fromMe ? name : props.sender}</div>
			<div className="contents">{props.message}</div>
		</div>
	);
}
