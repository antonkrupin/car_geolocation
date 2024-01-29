import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { fetchOrders } from "../../slices/selectors";

import BackwardButton from "../../components/BackwardButton/BackwardButton";

import "./FreightOrderDetails.css";

const FreightOrderDetails = (props) => {
  const orders = useSelector(fetchOrders)[1];
  const id = useParams().id;
	
  const {
    status,
    city,
    address,
    storage,
    enterDate,
    loadingSlot,
    carNumber,
    priority,
  } = orders.filter((order) => order.id === id)[0];
  return (
		<div>
			<BackwardButton />
			<li>{status}</li>
			<li>{city}</li>
			<li>{address}</li>
			<li>{storage}</li>
			<li>{enterDate}</li>
			<li>{loadingSlot}</li>
			<li>{carNumber}</li>
			<li>{priority}</li>
		</div>
	);
};

export default FreightOrderDetails;

/*

'id': '410045635',
'status': 'Не зарегистрирован',
'city': 'Череповец',
'address': 'г. Череповец, улица 8-го марта, дом 54',
'storage': '324-Череповец-М',
'enterDate': '12.02.24',
'loadingSlot': '11:00-16:00',
'carNumber': 'a202aa',
'priority': '1',

*/
