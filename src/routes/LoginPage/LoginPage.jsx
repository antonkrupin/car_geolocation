import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import cn from 'classnames';

import { setPhone, setOrders, setIsLoading, setError } from "../../slices/mainReducer";
import { fetchIsLoading, fetchError } from "../../slices/selectors";

import FilledButton from "../../components/FilledButton/FilledButton";
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock';

import "./LoginPage.css";

import { TEST_ORDERS } from "../../assets/TEST_CONST";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneInputRef = useRef();

  const [phone, setPhoneNumber] = useState("+7");
  const isLoading = useSelector(fetchIsLoading);
  const error = useSelector(fetchError);

  useEffect(() => {
    phoneInputRef.current.focus();
  });

  const redirectTest = () => {
    dispatch(setIsLoading(false));
    const formattedPhone = phone
      .replace("+7", "8")
      .replaceAll(" ", "")
      .split("")
      .filter((el) => !isNaN(Number(el)))
      .join("");
    if (TEST_ORDERS[formattedPhone]) {
      dispatch(setOrders(TEST_ORDERS[formattedPhone]));
      dispatch(setPhone(formattedPhone));
      navigate("/accessConfirmation");
    } else {
      dispatch(setError('ordersNotFound'));
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    setTimeout(redirectTest, 1000);
  };

  const phoneInputHandler = (e) => {
    const value = e.target.value;
    dispatch(setError());
    setPhoneNumber((prev) => {
      if (prev === "+7" && prev.length > e.target.value.length) {
        return "+7";
      }
      if (prev.length < e.target.value.length) {
        if (!isNaN(e.target.value.at(-1))) {
          dispatch(setError());
          switch (phone.length) {
            case 2: {
              let lastChar = value.at(-1);
              e.target.value = value.slice(0, value.length - 1);
              e.target.value += ` (${lastChar}`;
              return e.target.value;
            }
            case 6: {
              e.target.value += ") ";
              return e.target.value;
            }
            case 12: {
              let lastChar = value.at(-1);
              e.target.value = value.slice(0, value.length - 1);
              e.target.value += ` ${lastChar}`;
              return e.target.value;
            }
            case 15: {
              let lastChar = value.at(-1);
              e.target.value = value.slice(0, value.length - 1);
              e.target.value += `-${lastChar}`;
              return e.target.value;
            }
            default: {
              return e.target.value;
            }
          }
        } else {
          e.target.value = value.slice(0, value.length - 1);
          dispatch(setError("Вводить только цифры"));
          return prev;
        }
      } else {
        return e.target.value;
      }
    });
  };

  const phoneInputClassName = cn('phoneInput', {
    'errorInput': error,
  })

  return (
    <>
      <div className="loginPage">
        {error && (
          <ErrorBlock show={error} error={error} />
        )}
        <div className="loginPage__content">
          <h3>Введите номер телефона для регистрации</h3>
          <div className="loginPage__error">{error}</div>
          <form onSubmit={formHandler}>
            <div className={phoneInputClassName}>
              <input
                onChange={phoneInputHandler}
                maxLength="18"
                type="tel"
                placeholder="+7 (999) 999 99-99"
                value={phone}
                ref={phoneInputRef}
                required
              />
            </div>
            {isLoading && <FilledButton isSpinner disabled />}
            {!isLoading && (
              <FilledButton
                buttonText="Войти"
                disabled={phone.length === 18 ? false : true}
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;