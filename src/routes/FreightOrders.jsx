import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { setOrders } from '../slices/mainReducer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../slices/selectors';

import OrderItem from '../components/OrderItem/OrderItem';

const FreightOrders = () => {
	const dispatch = useDispatch();
	const phoneId = useParams().phone;
	const orders = useSelector(fetchOrders);
	const ordersAll = {
		'89062087761': [
			['Круипн Антон Петрович', '6754', '443322'],
			[
				['4100456344', 'Не зарегистрирован', 'Череповец'],
				['4100456347', 'Не зарегистрирован', 'Череповец'],
				['4100456333', 'Зарегистрирован', 'Череповец'],
			]
		],
		'89114047953': [
			['Иванов Иван Иванович', '9034', '123098'],
			[
				['4200456344', 'Не зарегистрирован', 'Череповец'],
				['4300456347', 'Зарегистрирован', 'Череповец'],
				['4400456333', 'Зарегистрирован', 'Череповец'],
			]
		]
	};

	useEffect(() => {
		console.log(ordersAll[phoneId]);
		ordersAll[phoneId] && dispatch(setOrders(ordersAll[phoneId]));
	}, []);

	return (
		<>
			{orders.length !== 0 && (
				<div className="driverInfo">
					<h3>ФИО: {orders[0][0]}</h3>
					<h3>В/У: {orders[0][1]} {orders[0][2]}</h3>
					<h3>Телефон: {phoneId}</h3>
				</div>
			)}
			{orders.length !== 0 && (
				<table>
					<thead>
						<tr>
							<th>
								Заказы
							</th>
							<th>
								Статус
							</th>
							<th>
								Город
							</th>
							<th>
								Детали заказа
							</th>
						</tr>
					</thead>
					<tbody>
						{
							orders[1].map((order, index) => 
								//console.log(order);
								<OrderItem key={index} order={order} />
							)
						}
					</tbody>
				</table>
			)
			}
		</>
	)
};

export default FreightOrders;