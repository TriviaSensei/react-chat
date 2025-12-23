import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { socket } from '../../socket';
import './NameForm.css';

import { useState } from 'react';

export default function NameForm() {
	const { setName } = useContext(UserContext);
	const [value, setValue] = useState('');
	const changeName = () => {
		socket.emit('set-name', { name: value }, (data) => {
			if (data.status === 'success') {
				setName(data.name);
			}
		});
	};
	const setNameEnter = (e) => {
		if (e.key.toLowerCase() === 'enter') changeName();
	};
	return (
		<div className="name-form">
			<p>Name:</p>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={setNameEnter}
			></input>
			<button onClick={changeName}>Submit</button>
		</div>
	);
}
