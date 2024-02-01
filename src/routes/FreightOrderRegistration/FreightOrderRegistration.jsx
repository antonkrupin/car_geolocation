import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import cn from "classnames";

import { changeOrder } from "../../slices/mainReducer";

import BackwardButton from "../../components/BackwardButton/BackwardButton";
import TimeSelectItem from "../../components/TimeSelectItem/TimeSelectItem";
import FilledButton from "../../components/FilledButton/FilledButton";
import Spinner from "../../components/Spinner/Spinner";
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock";

import calendarIcon from "../../images/icons/calendar-2.png";
import calendarIconError from "../../images/icons/calendarError.png";
import dropDownIcon from "../../images/icons/chevron-down.png";

import "./FreightOrderRegistration.css";

import { TEST_TIME } from "../../assets/TEST_CONST";
import { TEST_CAR_COORDS } from "../../assets/TEST_CONST";
import { generateRandomNumber } from "../../assets/TEST_CONST";
import CityMap from "../../components/CItyMap/CityMap";

const FreightOrderRegistration = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isTimeListHidden, setIsTimeListHidden] = useState(true);
  const [loadingSlot, setloadingSlot] = useState(TEST_TIME[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const timeSelectListClassName = cn("timeSelectList", "scrollable", {
    hidden: isTimeListHidden,
  });

  const timeSelectClassName = cn("timeSelect", {
    'timeSelectError': error,
  });

  const timeSelectListHandler = () => {
    setError(false);
    setIsTimeListHidden(!isTimeListHidden);
  };

  const timeSelectHandler = (e) => {
    if (e.target.innerText === "12:00-15:00") {
      setError('bookedLoadingSlot');
			setloadingSlot(e.target.innerText);
      setIsTimeListHidden(!isTimeListHidden);
    } else {
      setError(false);
      setloadingSlot(e.target.innerText);
      setIsTimeListHidden(!isTimeListHidden);
    }
  };

  const redirectTest = () => {
    setLoading(false);
    navigate(-1);
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (generateRandomNumber() < 0.5) {
      setError('registrationError');
    } else {
      setLoading(true);
      setError(false);
      dispatch(changeOrder({ id: id, status: 1, loadingSlot: loadingSlot }));
      setTimeout(redirectTest, 2000);
    }
  };

  return (
    <>
      {!loading && (
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
                src={error ? calendarIconError : calendarIcon}
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
					<CityMap carCoords={TEST_CAR_COORDS[3]}/>
        </div>
      )}
      {loading && (
        <div className="freigthOrderRegistration">
          <h1>Регистрация заказа</h1>
          <Spinner size="big" color="blue" />
        </div>
      )}
    </>
  );
};

export default FreightOrderRegistration;
