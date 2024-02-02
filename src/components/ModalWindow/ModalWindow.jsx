import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from 'classnames';

import { setModalOpen, changeOrder, setError, setIsLoading } from "../../slices/mainReducer";
import { fetchIsModalOpen, fetchError, fetchIsLoading } from "../../slices/selectors";

import ErrorBlock from "../ErrorBlock/ErrorBlock";
import BackwardButton from "../BackwardButton/BackwardButton";
import TimeSelectItem from "../TimeSelectItem/TimeSelectItem";
import FilledButton from "../FilledButton/FilledButton";
import Spinner from "../Spinner/Spinner";

import calendarIcon from "../../images/icons/calendar-2.png";
import calendarIconError from "../../images/icons/calendarError.png";
import dropDownIcon from "../../images/icons/chevron-down.png";
import closeButton from "../../images/icons/closeButton.png";

import "./ModalWindow.css";

import {
	TEST_TIME,
  TEST_KPP_COORDS,
  TEST_CAR_COORDS,
  TEST_REGISTRATION_DISTANCE,
  getDistanceFromLatLonInKm,
} from "../../assets/TEST_CONST";

const ModalWindow = (props) => {
	const { id, type } = props;

  const dispatch = useDispatch();
  const isModalOpen = useSelector(fetchIsModalOpen);
	const isLoading = useSelector(fetchIsLoading);
	const error = useSelector(fetchError);

	const [isTimeListHidden, setIsTimeListHidden] = useState(true);
  const [loadingSlot, setloadingSlot] = useState(TEST_TIME[0]);

	const modalWindowClassName = cn('modalWindowOverlay', {
		'closed': !isModalOpen,
	});

	const timeSelectClassName = cn("timeSelect", {
    'timeSelectError': error === 'bookedLoadingSlot',
  });

	const timeSelectListClassName = cn("timeSelectList", "scrollable", {
    hidden: isTimeListHidden,
  });

  const closeModalHandler = () => {
    dispatch(setModalOpen());
  };

	const confirmRegistrationCanceling = () => {
		dispatch(changeOrder({ id: id, status: 0 }));
		dispatch(setModalOpen());
	};

  const timeSelectListHandler = () => {
    dispatch(setError(false));
    setIsTimeListHidden(!isTimeListHidden);
  };

  const timeSelectHandler = (e) => {
    if (e.target.innerText === "12:00-15:00") {
      dispatch(setError('bookedLoadingSlot'));
			setloadingSlot(e.target.innerText);
      setIsTimeListHidden(!isTimeListHidden);
    } else {
      dispatch(setError(false));
      setloadingSlot(e.target.innerText);
      setIsTimeListHidden(!isTimeListHidden);
    }
  };

  /*const redirectTest = () => {
    setLoading(false);
    navigate(-1);
  };*/

  const formHandler = (e) => {
		e.preventDefault();
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
			setError('outOfRegistrationZone');
			setTimeout(() => {setError(false)}, 6000);
		} else {
			dispatch(setIsLoading(true));
			dispatch(setError(false));
			dispatch(changeOrder({ id: id, status: 1, loadingSlot: loadingSlot }));
			setTimeout(() => {dispatch(setModalOpen())}, 2000);
		}
  };

  return (
		<>
			{type === 'cancelRegistration' && (
				<div
					className={modalWindowClassName}>
					<div className="modalWindow">
						<button
							onClick={closeModalHandler}
							className="closeModalButton">
							<img src={closeButton} alt="Закрыть модальное окно" />
						</button>
						<h3>Отмена регистрации</h3>
						<h4>Вы действительно хотите отменить регистрацию?</h4>
						<div>
							<button
								type="submit"
								onClick={confirmRegistrationCanceling}
								className="confirmCancelButton">
								Подтвердить отмену
							</button>
						</div>
					</div>
				</div>
			)}
			{type === 'registration' && (
				<>
					{!isLoading && (
						<div className="freigthOrderRegistration">
							{error && (
								<ErrorBlock
									show={error}
									error={error}
								/>
							)}
							<div className="freightOrderRegistration__content">
								<BackwardButton />
								<h1>
									Регистрация заказа <span>{id}</span>
								</h1>
								<h4>Для регистрации проверьте корректность слота погрузки</h4>
								<div onClick={timeSelectListHandler} className={timeSelectClassName}>
									<img
										src={error === 'bookedLoadingSlot' ? calendarIconError : calendarIcon}
										alt="Иконка календаря"
									/>
									<h3>{loadingSlot}</h3>
									<img src={dropDownIcon} alt="Раскрыть список" />
								</div>
								<div className={timeSelectListClassName}>
									{TEST_TIME.map((time, index) => (
										<TimeSelectItem
											key={index}
											onClick={timeSelectHandler}
											text={time}
										/>
									))}
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
								<h5>
									<span>*</span>Подтверждает вашу готовность заехать раньше, если
									такая возможность будет
								</h5>
								<hr />
								<FilledButton
									onClick={formHandler}
									buttonText="Подтвердить время погрузки"
								/>
							</div>
						</div>
					)}
					{isLoading && (
						<div className="freigthOrderRegistration">
							<h1>Регистрация заказа</h1>
							<Spinner size="big" color="blue" />
						</div>
					)}
				</>
			)}
		</>
    
  );
};

export default ModalWindow;
