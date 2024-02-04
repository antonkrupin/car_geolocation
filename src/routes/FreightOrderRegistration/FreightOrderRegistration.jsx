import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import cn from "classnames";

import { changeOrder, setModalOpen, setIsLoading, setError } from "../../slices/mainReducer";
import { fetchIsLoading, fetchError } from "../../slices/selectors";

import TimeSelectItem from "../../components/TimeSelectItem/TimeSelectItem";
import FilledButton from "../../components/FilledButton/FilledButton";
import Spinner from "../../components/Spinner/Spinner";
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock";

import calendarIcon from "../../images/icons/calendar-2.png";
import calendarIconError from "../../images/icons/calendarError.png";
import dropDownIcon from "../../images/icons/chevron-down.png";

import "./FreightOrderRegistration.css";

import {
	TEST_TIME,
  TEST_KPP_COORDS,
  TEST_CAR_COORDS,
  TEST_REGISTRATION_DISTANCE,
  getDistanceFromLatLonInKm,
} from "../../assets/TEST_CONST";

const FreightOrderRegistration = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isTimeListHidden, setIsTimeListHidden] = useState(true);
  const [loadingSlot, setloadingSlot] = useState(TEST_TIME[0]);
  const isLoading = useSelector(fetchIsLoading);
  const error = useSelector(fetchError);

  const timeSelectListClassName = cn("timeSelectList", "scrollable", {
    hidden: isTimeListHidden,
  });

  const timeSelectClassName = cn("timeSelect", {
    'timeSelectError': error === 'bookedLoadingSlot',
  });

  const timeSelectListHandler = () => {
    dispatch(setError());
    setIsTimeListHidden(!isTimeListHidden);
  };

  const timeSelectHandler = (e) => {
    if (e.target.innerText === "12:00-15:00") {
      dispatch(setError('bookedLoadingSlot'));
			setloadingSlot(e.target.innerText);
      setIsTimeListHidden(!isTimeListHidden);
    } else {
      dispatch(setError());
      setloadingSlot(e.target.innerText);
      setIsTimeListHidden(!isTimeListHidden);
    }
  };

  const redirectTest = () => {
    dispatch(setIsLoading(false));
    dispatch(setModalOpen());
    //navigate(-1);
  };

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
      dispatch(setError('outOfRegistrationZone'));
			setTimeout(() => {dispatch(setError())}, 6000);
		} else {
      dispatch(setIsLoading(true));
      dispatch(setError());
			dispatch(changeOrder({ id: id, status: 1, loadingSlot: loadingSlot }));
			setTimeout(redirectTest, 2000);
		}
  };

  return (
    <>
    {error && (
      <ErrorBlock
        show={error}
        error={error}
      />
    )}
      {!isLoading && (
        <div className="freigthOrderRegistration">
          <div className="freightOrderRegistration__content">
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
          <div className="freightOrderRegistration__content">
            <h1>Регистрация заказа</h1>
            <Spinner size="big" color="blue" />
          </div>
        </div>
      )}
    </>
  );
};

export default FreightOrderRegistration;
