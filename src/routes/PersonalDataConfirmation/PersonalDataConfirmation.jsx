import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { fetchOrders } from '../../slices/selectors';

import FilledButton from '../../components/FilledButton/FilledButton';

import registrationSuccess from '../../images/icons/registration_success.png';

import './PersonalDataConfirmation.css';

const PersonalDataConfirmation = () => {
  const navigate = useNavigate();
  const orders = useSelector(fetchOrders);
  const phoneId = useParams().phone;

	const [greeting, setGreeting] = useState(true);
	  
  const buttonClickHandler = () => {
    navigate(`/freightOrders/${phoneId}`);
  }

	useEffect(() => {
		setTimeout(() => setGreeting(false), 2000);
	}, [])

  return (
		<>
			{greeting && (
				<div className="personalDataConfirmation">
					<div className="personalDataConfirmation__content">
						<h3>Здравствуйте, {orders[0][0]}</h3>
						<img src={registrationSuccess} alt="Регистрация успешна"/>
					</div>
				</div>
			)}
			{!greeting && (
				<div className="personalDataConfirmation">
					{orders && (
						<div className="personalDataConfirmation__content">
						<h3>Подтвердите свои данные</h3>
						<div className="personalData">
							<div className="fio">
								<h4>ФИО</h4>
								<h5>{orders[0][0]}</h5>
							</div>
							<div className="vu">
								<h4>В/У</h4>
								<h5>{orders[0][1]}</h5>
							</div>
							<div className="phone">
								<h4>Телефон</h4>
								<h5>{phoneId}</h5>
							</div>
						</div>
						<h6>Если данные некорректные свяжитесь пожалуйста с диспетчером</h6>
						<FilledButton onClick={buttonClickHandler} buttonText="Подтвердить" />
					</div>
					)}
					{!orders && (
						<h1>Ничего не найдено</h1>
					)}
				</div>
			)}
		</>
  )
};

export default PersonalDataConfirmation;
