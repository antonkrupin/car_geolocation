import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { setModalOpen, setIsLoading } from "../../slices/mainReducer";
import { fetchOrders, fetchIsModalOpen } from "../../slices/selectors";

import BackwardButton from "../../components/BackwardButton/BackwardButton";
import FilledButton from "../../components/FilledButton/FilledButton";
import OutlinedButton from "../../components/OutlinedButton/OutlinedButton";
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

import "./FreightOrderDetails.css";

import {
  TEST_KPP_COORDS,
  TEST_CAR_COORDS,
  TEST_REGISTRATION_DISTANCE,
  getDistanceFromLatLonInKm,
} from "../../assets/TEST_CONST";

const FreightOrderDetails = () => {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(fetchIsModalOpen);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
	const [modalType, setModalType] = useState();

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
    /*const registeredOrders = orders.filter((order) => order.status === 1);
    if (registeredOrders.length !== 0) {
      setError('haveRegesteredOrder');
      setTimeout(() => {
        setError(false);
      }, 6000);
    } else {
      navigate(`/registration/${id}`);
    }*/
		setModalType('registration');
		//dispatch(setIsLoading());
		dispatch(setModalOpen());
  };

	const orderRegistrationCancelHandler = () => {
		//TEST_CAR_COORDS[0] - не в радиусе
		//TEST_CAR_COORDS[1] - в радиусе
		//TEST_CAR_COORDS[2] - не в радиусе, но очень близко
		//TEST_CAR_COORDS[3] - в радиусе
		const distance = getDistanceFromLatLonInKm(
			TEST_KPP_COORDS[0],
			TEST_KPP_COORDS[1],
			TEST_CAR_COORDS[1][0],
			TEST_CAR_COORDS[1][1]
		);
		if (TEST_REGISTRATION_DISTANCE < distance) {
			setError('outOfRegistrationCancelingZone');
			setTimeout(() => {setError(false)}, 6000);
		} else {
			dispatch(setModalOpen());
		}
	};

  return (
		<>
			<ModalWindow id={id} type={modalType}/>
			{!isModalOpen && (
				<div className="freightOrderDetails">
					{error && (
						<ErrorBlock
							show={error}
							error={error}
						/>
					)}
					<div className="freightOrderDetails__content">
						<BackwardButton />
						<h1>
							Заказ <span>{id}</span>
						</h1>
						<span className={status && "registered"}>
							{status ? "Зарегистрирован" : "Не зарегистрирован"}
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
								<input id="earlyChecOut" type="checkbox" disabled />
								<label htmlFor="earlyChecOut">Готовность раннего въезда</label>
							</div>
							<div>
								<input id="withOutQueue" type="checkbox" disabled />
								<label htmlFor="withOutQueue">Без очереди</label>
							</div>
						</form>
						<hr />
						<OutlinedButton buttonText="Посмотреть схему проезда" />
						{status ? (
							<OutlinedButton onClick={orderRegistrationCancelHandler} buttonText="Отменить регистрацию" />
						) : (
							<FilledButton
								onClick={orderRegistrationHandler}
								buttonText="Зарегистрироваться"
							/>
						)}
					</div>
				</div>
			)}
		</>
  );
};

export default FreightOrderDetails;
