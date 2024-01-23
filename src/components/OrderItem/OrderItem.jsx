import React from 'react';
import { useNavigate } from 'react-router';

const OrderItem = (props) => {
	const { order } = props;
	const navigate = useNavigate();
	const buttonHandler = () => {
		navigate(`/details/${order[0]}`)
	};
	return (
		<tr>
			<td>{order[0]}</td>
			<td>{order[1]}</td>
			<td>{order[2]}</td>
			<td><button onClick={buttonHandler}>Детали заказа</button></td>
		</tr>
	)
};

export default OrderItem;