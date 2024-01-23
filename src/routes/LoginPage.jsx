import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { setPhone } from '../slices/mainReducer';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState();
	const [phone, setPhoneNumber] = useState('');

	const formHandler = (e) => {
		e.preventDefault();
		dispatch(setPhone(phone));
		navigate('/accessConfirmation');
	};

	const phoneInputHandler = (e) => {
		const value = e.target.value;
		if (Number(value[0]) !== 8) {
			e.target.value = '8' + value;
		}
		if (!Number(value)) {
			setError('В номере телефона только цифры');
			e.target.value = value.slice(0, value.length-1);
		} else {
			setError();
			setPhoneNumber(e.target.value);
		}
	};

	return (
		<>
			<div>
				<form onSubmit={formHandler}>
					<input
						onInput={phoneInputHandler}
						maxLength="11"
						placeholder="Телефон"
						required
					/>
					<button 
						type="submit"
						disabled={phone.length === 11 ? false : true}
					>
						Войти
					</button>
				</form>
				<div className="error">
					{error}
				</div>
			</div>
		</>
	)
};

export default LoginPage;