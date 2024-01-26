import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { setPhone } from "../../slices/mainReducer";

import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const phoneInputRef = useRef();
  const [phone, setPhoneNumber] = useState("+7");

	/*useEffect(() => {
		phoneInputRef.current.focus();
	});*/

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(setPhone(phone));
    navigate("/accessConfirmation");
  };

  const phoneInputHandler = (e) => {
    const value = e.target.value;
    if (Number(value[0]) !== 8) {
      e.target.value = "8" + value;
    }
    if (!Number(value)) {
      //setError("В номере телефона только цифры");
      e.target.value = value.slice(0, value.length - 1);
    } else {
      //setError();
      setPhoneNumber(e.target.value);
    }
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginPage__content">
          <h3>Введите номер телефона для регистрации</h3>
          <form onSubmit={formHandler}>
            <div>
              <input
                maxLength="11"
                placeholder="+7 (999) 999 99-99"
								value={phone}
								ref={phoneInputRef}
                required
              />
            </div>
            <button type="submit" disabled={phone.length === 11 ? false : true}>
              Войти
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
