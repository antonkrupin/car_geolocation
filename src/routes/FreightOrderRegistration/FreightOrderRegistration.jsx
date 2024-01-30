import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import cn from "classnames";

import { changeOrder } from "../../slices/mainReducer";

import BackwardButton from "../../components/BackwardButton/BackwardButton";
import FilledButton from "../../components/FilledButton/FilledButton";
import Spinner from "../../components/Spinner/Spinner";

import calendarIcon from "../../images/icons/calendar-2.png";
import dropDownIcon from "../../images/icons/chevron-down.png";
import "./FreightOrderRegistration.css";

const TEST_TIME = [
  "06:00-08:00",
  "08:00-12:00",
  "12:00-15:00",
  "15:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
  "06:00-08:00",
  "08:00-12:00",
  "12:00-15:00",
  "15:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
  "06:00-08:00",
  "08:00-12:00",
  "12:00-15:00",
  "15:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
];

const FreightOrderRegistration = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isTimeListHidden, setIsTimeListHidden] = useState(true);
  const [loadingSlot, setloadingSlot] = useState(TEST_TIME[0]);
  const [loading, setLoading] = useState(false);

  const timeSelectListClassName = cn("timeSelectList", "scrollable", {
    hidden: isTimeListHidden,
  });

  const timeSelectListHandler = () => {
    setIsTimeListHidden(!isTimeListHidden);
  };

  const timeSelectHandler = (e) => {
    setloadingSlot(e.target.innerText);
  };

  const redirectTest = () => {
    setLoading(false);
    navigate(-1);
  };

  const formHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(changeOrder({ id: id, status: 1, loadingSlot: loadingSlot }));
    setTimeout(redirectTest, 2000);
  };

  return (
    <>
      {!loading && (
        <div className="freigthOrderRegistration">
          <div className="freightOrderRegistration__content">
            <BackwardButton />
            <h1>Регистрация заказа {id}</h1>
            <h4>Для регистрации проверьте корректность слота погрузки</h4>
            <div onClick={timeSelectListHandler} className="timeSelect">
              <img src={calendarIcon} alt="Иконка календаря" />
              <h3>{loadingSlot}</h3>
              <img src={dropDownIcon} alt="Раскрыть список" />
            </div>
            <div className={timeSelectListClassName}>
              {TEST_TIME.map((time, index) => (
                <span
                  onClick={timeSelectHandler}
                  className="timeItem"
                  key={index}
                >
                  {time}
                </span>
              ))}
            </div>
            <h5>
              Подтверждает вашу готовность заехать раньше, если такая
              возможность будет
            </h5>
            <form>
              <div>
                <input id="earlyChecOut" type="checkbox" />
                <label htmlFor="earlyChecOut">Готовность раннего въезда</label>
              </div>
              <div>
                <input id="withOutQueue" type="checkbox" />
                <label htmlFor="withOutQueue">Без очереди</label>
              </div>
            </form>
            <hr />
            <FilledButton
              onClick={formHandler}
              buttonText="Подтвердить время погрузки"
            />
          </div>
        </div>
      )}
      {loading && (
				<div className="freigthOrderRegistration">
					<h1>Регистрация</h1>
					<Spinner size="big" color="blue"/>
				</div>
			)}
    </>
  );
};

export default FreightOrderRegistration;
