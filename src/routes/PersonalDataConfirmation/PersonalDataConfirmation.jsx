import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { setOrders } from '../../slices/mainReducer';

import './PersonalDataConfirmation.css';

const TEST_ORDERS = {
  '89062087761': [
    ['Крупин Антон Петрович', '6754443322'],
    [
      {
        'id': '410045634',
        'status': 'Не зарегистрирован',
        'city': 'Череповец',
				'address': 'г. Череповец, улица 8-го марта, дом 54',
				'storage': '324-Череповец-М',
				'enterDate': '12.02.24',
				'loadingSlot': '11:00-16:00',
				'carNumber': 'a202aa',
				'priority': '1',
			},
      {
        'id': '410045635',
        'status': 'Не зарегистрирован',
        'city': 'Череповец',
				'address': 'г. Череповец, улица 8-го марта, дом 54',
				'storage': '324-Череповец-М',
				'enterDate': '12.02.24',
				'loadingSlot': '11:00-16:00',
				'carNumber': 'a202aa',
				'priority': '1',
			},
			{
        'id': '410045636',
        'status': 'Зарегистрирован',
        'city': 'Череповец',
				'address': 'г. Череповец, улица 8-го марта, дом 54',
				'storage': '324-Череповец-М',
				'enterDate': '12.02.24',
				'loadingSlot': '11:00-16:00',
				'carNumber': 'a202aa',
				'priority': '1',
			}
    ]
  ],
  '89114047953': [
    ['Иванов Иван Иванович', '9034', '123098'],
    [
      ['420045634', 'Не зарегистрирован', 'Череповец'],
      ['430045634', 'Зарегистрирован', 'Череповец'],
      ['440045633', 'Зарегистрирован', 'Череповец'],
    ]
  ]
};

const PersonalDataConfirmation = () => {
  const phoneId = useParams().phone;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = TEST_ORDERS[phoneId];
  
  dispatch(setOrders(orders));
  const buttonClickHandler = () => {
    navigate(`/freightOrders/${phoneId}`);
  }

  return (
    <div className="personalDataConfirmation">
      <div className="personalDataConfirmation__content">
        <h3>Здравствуйте, {orders[0][0]}</h3>
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
        <button onClick={buttonClickHandler} >Подтвердить</button>
      </div>
    </div>
  )
};

export default PersonalDataConfirmation;