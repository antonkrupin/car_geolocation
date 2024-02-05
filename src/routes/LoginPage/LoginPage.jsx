import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from 'react-imask';
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
  
	const ref = useRef(null);
	const inputRef = useRef(null);

	const [isDisabled, setIsDisabled] = useState(true);

  const isLoading = useSelector(fetchIsLoading);
  const error = useSelector(fetchError);

  useEffect(() => {
    inputRef.current.focus();
  });

  const redirectTest = (value) => {
    dispatch(setIsLoading(false));
    const formattedPhone = value
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
		const value = inputRef.current.value;
    dispatch(setIsLoading(true));
    setTimeout(() => redirectTest(value), 1000);
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
          <form onSubmit={formHandler}>
						<div className={phoneInputClassName}>
							<IMaskInput
								mask="+{7} (000) 000 00-00"
								prepare={(appended, masked) => {
									if (appended === '8' && masked.value === '') return '+7';
									if (appended === '+') return '+7'
									return appended;
								}}
								onComplete={() => setIsDisabled(false)}
								onAccept={() => {
									setIsDisabled(true);
									dispatch(setError());
								}}
                type="tel"
								ref={ref}
								inputRef={inputRef}
								placeholder="+7 (999) 999 99-99"
							/>
						</div>
            {isLoading && <FilledButton isSpinner disabled />}
            {!isLoading && (
              <FilledButton
                buttonText="Войти"
                disabled={isDisabled}
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;