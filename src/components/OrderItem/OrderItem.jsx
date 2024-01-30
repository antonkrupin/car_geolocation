import React from 'react';
import { useNavigate, useLocation } from 'react-router';

import truckIcon from '../../images/icons/truck.png';
import detailButton from '../../images/icons/detailButton.png';

import './OrderItem.css';

const OrderItem = (props) => {
	const { order } = props;
	
	const navigate = useNavigate();
	const location = useLocation();
	
	const buttonHandler = () => {
		navigate(`/details/${order.id}`, {state: { "prev": location.pathname }});
	};
	return (
		<div className="orderItem">
			<img src={truckIcon} alt="Иконка грузовика"/>
			<div>
				<h3 className="orderItem_id">{order.id}</h3>
				<h4 className="orderItem_city">{order.city}</h4>
				<h5 className="orderItem_status">{order.status}</h5>
			</div>
			<button
				onClick={buttonHandler}
				className="orderItem_button"
			>
				<img src={detailButton} alt="Детали заказа"/>
			</button>
		</div>
	)
};

export default OrderItem;
