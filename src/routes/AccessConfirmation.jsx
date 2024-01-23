import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { fetchPhone } from '../slices/selectors';

const AccessConfirmation = () => {
	const counterValue = 20;
	const phone = useSelector(fetchPhone);
	const navigate = useNavigate();
	const [counter, setCounter] = useState(counterValue);
	const [isCounting, setIsCounting] = useState(false);

	const resendAccessCode = () => {
		setIsCounting(true);
		setCounter(counterValue);
		console.log('code is send');
	}

	const hidePhoneNumbers = (phone) => {
		return [...phone].map((el, index) => {
			if (index > 4 && index < 9) {
				return '*';
			} else {
				return el;
			}
		});
	};

	const timer = () => {
		const intervalId = setInterval(() => {
			setCounter((prev, curr) => {
				if (prev - 1 === 0) {
					clearInterval(intervalId);
					setIsCounting(false);
				}
				return curr = prev - 1;
			});
		}, 1000);
	}

	useEffect(() => {
		timer();
	}, [isCounting]);

	const formHandler = (e) => {
		e.preventDefault();
		navigate(`/freightOrders/${phone}`);
	};

	const backButtonHandler = () => {
		navigate('/login');
	};

	return (
		<div>
			<form onSubmit={formHandler}>
				<label htmlFor="code">Код подтверждения</label>
				<input
					id="code"
					name="code"
					required
					maxLength="4"
					placeholder='Введите код подтверждения'
				/>
				<button type="submit">Подтвердить</button>
			</form>
			<h3>Вам отправлен код подтверждения на номер - {hidePhoneNumbers(phone)}</h3>
			<div>
				<button
					onClick={resendAccessCode}
					disabled={counter !== 0 ? true : false}
				>
					Отправить код еще раз через
				</button>
				<button
					onClick={backButtonHandler}
					disabled={counter !== 0 ? true : false}
				>
					Назад
				</button>
				{counter !==0 && (
					<span>{counter}</span>
				)}
			</div>
		</div>
	)
};

export default AccessConfirmation;