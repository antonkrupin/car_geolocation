import React from 'react';

const OrderItem = (props) => {
	const { order } = props;
	return (
		<tr>
			<td>{order[0]}</td>
			<td>{order[1]}</td>
			<td>{order[2]}</td>
			<td>Детали заказа</td>
		</tr>
	)
};

export default OrderItem;