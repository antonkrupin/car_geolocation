import React from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { fetchOrders } from "../../slices/selectors";

import BackwardButton from "../../components/BackwardButton/BackwardButton";
import FilledButton from "../../components/FilledButton/FilledButton";
import OutlinedButton from '../../components/OutlinedButton/OutlinedButton';

import "./FreightOrderDetails.css";

const FreightOrderDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();

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

	const orderRegistrationHandler = () => {
		navigate(`/registration/${id}`, {state: { "prev": location.pathname }});
	}

  return (
    <div className="freightOrderDetails">
      <div className="freightOrderDetails__content">
				<BackwardButton />
				<h1>Заказ <span>{id}</span></h1>
				<span
					className={status && "registered"}
				>
					{status ? 'Зарегистрирован' : 'Не зарегистрирован'}
				</span>
				<div className="freightOrderDetails__div">
					<div className="address">
						<h5>Адрес</h5>
						<h6>{address}</h6>
					</div>
					<div className="storage">
						<h5>Склад</h5>
        		<h6>{storage}</h6>
					</div>
					<div className="enterDate">
						<h5>Дата въезда</h5>
						<h6>{enterDate}</h6>
					</div>
					<div className="carNumber">
						<h5>№ ТС</h5>
						<h6>{carNumber}</h6>
					</div>
					<div className="loadingSlot">
						<h5>Слот погрузки</h5>
						<h6>{loadingSlot}</h6>
					</div>
					<div className="priority">
						<h5>Приоритет</h5>
						<h6>{priority}</h6>
					</div>
				</div>
				<form>
					<div>
						<input id="earlyChecOut" type="checkbox" disabled/>
						<label htmlFor="earlyChecOut">Готовность раннего въезда</label>
					</div>
					<div>
						<input id="withOutQueue" type="checkbox" disabled/>
						<label htmlFor="withOutQueue">Без очереди</label>
					</div>
				</form>
				<hr/>
				<OutlinedButton buttonText="Посмотреть схему проезда" />
				{status && (
					<OutlinedButton buttonText="Отменить регистрацию" />
				)}
				{status !== 1 && (
					<FilledButton onClick={orderRegistrationHandler} buttonText="Зарегистрироваться" />
				)}
      </div>
    </div>
  );
};

export default FreightOrderDetails;
