import React from 'react';
import { useNavigate } from 'react-router';

import './OrderItem.css';

const OrderItem = (props) => {
	const { order } = props;
	const navigate = useNavigate();
	/*const buttonHandler = () => {
		navigate(`/details/${order[0]}`)
	};*/
	return (
		<div className="orderItem">
			<img src="images/icons/detailButton.png" alt="Иконка грузовика"/>
			<div>
				<h3>{order[0]}</h3>
				<h4>{order[2]}</h4>
				<h5>{order[1]}</h5>
			</div>
			<img src="images/icons/detailButton.png" alt="Детали заказа"/>
		</div>
	)
};

export default OrderItem;

/*
<tr>
			<td>{order[0]}</td>
			<td>{order[1]}</td>
			<td>{order[2]}</td>
			<td><button onClick={buttonHandler}>Детали заказа</button></td>
		</tr>
*/