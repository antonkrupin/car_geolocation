import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from 'react-imask';
import cn from 'classnames';

import { setPhone, setOrders, setIsLoading, setError, setPersonalData } from "../../slices/mainReducer";
import { fetchIsLoading, fetchError } from "../../slices/selectors";

import FilledButton from "../../components/FilledButton/FilledButton";
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock';

import "./LoginPage.css";

import { TEST_ORDERS, TEST_PHONES } from "../../assets/TEST_CONST";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
	const ref = useRef<HTMLInputElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const isLoading = useSelector(fetchIsLoading);
  const error = useSelector(fetchError);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const redirectTest = (value: string) => {
    dispatch(setIsLoading());
    const formattedPhone = value
      .replace("+7", "8")
      .replaceAll(" ", "")
      .split("")
      .filter((el: string) => !isNaN(Number(el)))
      .join("");

    if (TEST_PHONES.indexOf(formattedPhone) !== -1) {
      const orders = TEST_ORDERS.filter((order) => order.id === formattedPhone)[0];
      dispatch(setOrders(orders.orders));
      dispatch(setPersonalData(orders.personalData));
      dispatch(setPhone(formattedPhone));
      navigate("/accessConfirmation");
    } else {
      dispatch(setError('ordersNotFound'));
    }
  };

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let value: string;
    if (inputRef.current) value = inputRef.current.value;
    dispatch(setIsLoading());
    setTimeout(() => redirectTest(value), 1000);
  };

  const phoneInputClassName = cn('phoneInput', {
    'errorInput': error,
  })

  return (
    <>
      <div className="loginPage">
        {error && (
          <ErrorBlock show={error ? true : false} error={error} />
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
									dispatch(setError(false));
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