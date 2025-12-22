import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './NameForm.css';

import { useState } from 'react';

export default function NameForm() {
	const { setName } = useContext(UserContext);
	const [value, setValue] = useState('');
	const setNameEnter = (e) => {
		if (e.key.toLowerCase() === 'enter') setName(value);
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
			<button onClick={() => setName(value)}>Submit</button>
		</div>
	);
}
