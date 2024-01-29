import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";

import { setOrders } from "../../slices/mainReducer";
import { fetchOrders } from "../../slices/selectors";

import OrderItem from "../../components/OrderItem/OrderItem";

import freightCar from "../../images/icons/freight-car.svg";
import profileIcon from "../../images/icons/user.svg";

import "./FreightOrders.css";

const FreightOrders = () => {
  const dispatch = useDispatch();
  const phoneId = useParams().phone;
  const orders = useSelector(fetchOrders);

  const [activeLink, setActiveLink] = useState("orders");

  /*const menuItemClassName = cn ('menuItem', {
		'active': 
	});*/

  const test = (e) => {
    console.log(e.target.parentNode);
  };

  return (
    <>
      <div className="freightOrders">
        <div className="freightOrders__content">
          <h1>Заказы</h1>
          <div className="ordersList">
            {orders.length !== 0 &&
              orders[1].map((order, index) => (
                <OrderItem key={index} order={order} />
              ))}
          </div>
          <h6>
            Вы можете добавить приложение на экран своего смартфона нажав кнопку
            снизу
          </h6>
          <button>Добавить на домашний экран</button>
        </div>
        <div className="freigthOrdersMenu__content">
          <div onClick={test} className="menuItem active">
            <img src={freightCar} alt="Заказы" />
            <h4>Заказы</h4>
          </div>
          <div onClick={test} className="menuItem">
            <img src={profileIcon} alt="Профиль" />
            <h4>Профиль</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreightOrders;
