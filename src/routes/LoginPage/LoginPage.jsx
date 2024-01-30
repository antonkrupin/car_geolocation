import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";

import { setPhone } from "../../slices/mainReducer";

import FilledButton from "../../components/FilledButton/FilledButton";

import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const phoneInputRef = useRef();

  const [phone, setPhoneNumber] = useState("+7");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    phoneInputRef.current.focus();
  });

  const redirectTest = () => {
    setLoading(false);
    const formattedPhone = phone
      .replace("+7", "8")
      .replaceAll(" ", "")
      .split("")
      .filter((el) => !isNaN(Number(el)))
      .join("");
    dispatch(setPhone(formattedPhone));
    navigate("/accessConfirmation", { state: { prev: [location.pathname] } });
  };

  const formHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(redirectTest, 2000);
  };

  const phoneInputHandler = (e) => {
    const value = e.target.value;
    setPhoneNumber((prev) => {
      if (prev === "+7" && prev.length > e.target.value.length) {
        return "+7";
      }
      if (prev.length < e.target.value.length) {
        if (!isNaN(e.target.value.at(-1))) {
          setError();
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
          setError("Вводить только цифры");
          return prev;
        }
      } else {
        return e.target.value;
      }
    });
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginPage__content">
          <h3>Введите номер телефона для регистрации</h3>
          <div className="loginPage__error">{error}</div>
          <form onSubmit={formHandler}>
            <div>
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
            {loading && <FilledButton isSpinner disabled />}
            {!loading && (
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