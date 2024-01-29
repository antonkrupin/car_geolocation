import React from 'react';
import { useNavigate } from 'react-router';

import truckIcon from '../../images/icons/truck.png';
import detailButton from '../../images/icons/detailButton.png';

import './OrderItem.css';

const OrderItem = (props) => {
	const { order } = props;
	const navigate = useNavigate();
	/*const buttonHandler = () => {
		navigate(`/details/${order[0]}`)
	};*/
	return (
		<div className="orderItem">
			<img src={truckIcon} alt="Иконка грузовика"/>
			<div>
				<h3 className="orderItem_id">{order[0]}</h3>
				<h4 className="orderItem_city">{order[2]}</h4>
				<h5 className="orderItem_status">{order[1]}</h5>
			</div>
			<button className="orderItem_button"><img src={detailButton} alt="Детали заказа"/></button>
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