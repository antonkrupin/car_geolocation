import React, { useEffect } from "react";
import { useParams } from "react-router";
import { setOrders } from "../../slices/mainReducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../slices/selectors";

import OrderItem from "../../components/OrderItem/OrderItem";

import "./FreightOrders.css";

const FreightOrders = () => {
  const dispatch = useDispatch();
  const phoneId = useParams().phone;
  const orders = useSelector(fetchOrders);

  return (
    <div className="ordersList">
			<img src="images/logo.png" alt="Северсталь" />
      {orders.length !== 0 &&
        orders[1].map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
    </div>
  );
};

export default FreightOrders;
