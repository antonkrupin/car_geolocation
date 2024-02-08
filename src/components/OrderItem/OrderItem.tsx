import React from 'react';
import { useNavigate } from 'react-router';

import cn from 'classnames';

// import truckIcon from '../../images/icons/truck.png';
// import detailButton from '../../images/icons/detailButton.png';
import { IMAGES } from '../../images/Images';

import './OrderItem.css';

interface OrderItem {
	order: {
		id: string,
		status: number,
		city: string,
	},
}

const OrderItem: React.FC<OrderItem> = (props) => {
	const { order } = props;
	
	const navigate = useNavigate();
	
	const buttonHandler = () => {
		navigate(`/details/${order.id}`);
	};

	const orderStatusClassName = cn('orderItem_status', {
		'registered': order.status,
	});

	return (
		<div className="orderItem">
			<img src={IMAGES.truckIcon} alt="Иконка грузовика"/>
			<div>
				<h3 className="orderItem_id">{order.id}</h3>
				<h4 className="orderItem_city">{order.city}</h4>
				<h5 className={orderStatusClassName}>{order.status ? 'Зарегистрирован' : 'Не зарегистрирован'}</h5>
			</div>
			<button
				onClick={buttonHandler}
				className="orderItem_button"
			>
				<img src={IMAGES.detailButton} alt="Детали заказа"/>
			</button>
		</div>
	)
};

export default OrderItem;
