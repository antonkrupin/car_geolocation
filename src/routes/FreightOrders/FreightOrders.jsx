import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import cn from 'classnames';

import { fetchOrders } from "../../slices/selectors";

import OrderItem from "../../components/OrderItem/OrderItem";
import OutlinedButton from "../../components/OutlinedButton/OutlinedButton";

import freightCar from "../../images/icons/freight-car.svg";
import freightCarGrey from "../../images/icons/freight-car-grey.svg";
import profileIcon from "../../images/icons/user.svg";
import profileIconGrey from "../../images/icons/user-grey.svg";

import "./FreightOrders.css";

const FreightOrders = () => {
  const phoneId = useParams().phone;
  const orders = useSelector(fetchOrders);

  const [activeLink, setActiveLink] = useState("orders");

  const changeActiveLink = (e) => {
    const clickedElement = e.target.closest('.menuItem');
    clickedElement.classList.add('active');
    setActiveLink(clickedElement.dataset.name);
    if (clickedElement.previousElementSibling) clickedElement.previousElementSibling.classList.remove('active');
    if (clickedElement.nextElementSibling) clickedElement.nextElementSibling.classList.remove('active');
  };

  const freigthOrdersMenuClassName = cn('freigthOrdersMenu__content', {
    'marginTop': activeLink === 'profile',
  })

  return (
    <>
      <div className="freightOrders">
        {activeLink === 'orders' && (
          <div className="freightOrders__content">
            <h1>Заказы</h1>
            <div className="ordersList">
              {orders.length !== 0 &&
                orders[1].map((order, index) => (
                  <OrderItem key={index} order={order} />
                ))}
              {orders.length === 0 && (
                <h4>Заказов нет</h4>
              )}
            </div>
            <h6>
              Вы можете добавить приложение на экран своего смартфона нажав кнопку
              снизу
            </h6>
            <OutlinedButton buttonText="Добавить на домашний экран" />
          </div>
        )}
        {activeLink === 'profile' && (
          <div className="freightOrders__content">
            <h1>Ваши данные</h1>
              <div className="personalData">
                <div className="fio">
                  <h4>ФИО</h4>
                  <h5>{orders[0][0]}</h5>
                </div>
                <div className="vu">
                  <h4>В/У</h4>
                  <h5>{orders[0][1]}</h5>
                </div>
                <div className="phone">
                  <h4>Телефон</h4>
                  <h5>{phoneId}</h5>
                </div>
              </div>
          </div>
        )}
        <div onClick={changeActiveLink} className={freigthOrdersMenuClassName}>
          <div className="menuItem active" data-name="orders">
            <img src={activeLink === 'orders' ? freightCar : freightCarGrey} alt="Заказы" />
            <h4>Заказы</h4>
          </div>
          <div className="menuItem" data-name="profile">
            <img src={activeLink === 'profile' ? profileIcon : profileIconGrey} alt="Профиль" />
            <h4>Профиль</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreightOrders;
