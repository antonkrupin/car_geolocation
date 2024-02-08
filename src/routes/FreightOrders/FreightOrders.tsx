import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";

import { setModalOpen } from "../../slices/mainReducer";
import { fetchOrders, fetchPersonalData } from "../../slices/selectors";

import ModalWindow from "../../components/ModalWindow/ModalWindow";
import OrderItem from "../../components/OrderItem/OrderItem";
import OutlinedButton from "../../components/OutlinedButton/OutlinedButton";

// import freightCar from "../../images/icons/freight-car.svg";
// import freightCarGrey from "../../images/icons/freight-car-grey.svg";
// import profileIcon from "../../images/icons/user.svg";
// import profileIconGrey from "../../images/icons/user-grey.svg";

import { IMAGES } from '../../images/Images';

import "./FreightOrders.css";

const FreightOrders: React.FC = () => {
  const dispatch = useDispatch();

  const phoneId = useParams().phone;
  const orders = useSelector(fetchOrders);
  const personalData = useSelector(fetchPersonalData);

  const [activeLink, setActiveLink] = useState<string>("orders");
  const [modalType, setModalType] = useState<string>("");

  const changeActiveLink = (e: React.MouseEvent<HTMLElement>) => {
    const clickedElement = (e.target as HTMLElement).closest(".menuItem");
    clickedElement?.classList.add("active");
    setActiveLink((clickedElement as HTMLElement)?.dataset.name!);
    if (clickedElement?.previousElementSibling)
      clickedElement.previousElementSibling.classList.remove("active");
    if (clickedElement?.nextElementSibling)
      clickedElement.nextElementSibling.classList.remove("active");
  };

  const freigthOrdersMenuClassName = cn("freigthOrdersMenu__content", {
    marginTop: activeLink === "profile",
  });

  const addToHomeScreenHandler = () => {
    setModalType("homeScreenAdd");
    dispatch(setModalOpen());
  };

  return (
    <>
      <ModalWindow modalType={modalType} />
      <div className="freightOrders">
        {activeLink === "orders" && (
          <div className="freightOrders__content">
            <h1>Заказы</h1>
            <div className="ordersList">
              {orders.length !== 0 && (
                orders.map((order, index) => (
                  <OrderItem key={index} order={order} />
                ))
              )}
              {orders.length === 0 && <h4>Заказов нет</h4>}
            </div>
            <h6>
              Вы можете добавить приложение на экран своего смартфона нажав
              кнопку снизу
            </h6>
            <OutlinedButton
              onClick={addToHomeScreenHandler}
              buttonText="Добавить на домашний экран"
            />
          </div>
        )}
        {activeLink === "profile" && (
          <div className="freightOrders__content">
            <h1>Ваши данные</h1>
            <div className="personalData">
              <div className="fio">
                <h4>ФИО</h4>
                <h5>{personalData[0]}</h5>
              </div>
              <div className="vu">
                <h4>В/У</h4>
                <h5>{personalData[1]}</h5>
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
            <img
              src={activeLink === "orders" ? IMAGES.freightCar : IMAGES.freightCarGrey}
              alt="Заказы"
            />
            <h4>Заказы</h4>
          </div>
          <div className="menuItem" data-name="profile">
            <img
              src={activeLink === "profile" ? IMAGES.profileIcon : IMAGES.profileIconGrey}
              alt="Профиль"
            />
            <h4>Профиль</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreightOrders;
