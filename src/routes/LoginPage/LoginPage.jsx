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
    navigate("/accessConfirmation");
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
            {loading && (
              <button type="submit" disabled>
                <svg className="spinner" viewBox="0 0 50 50">
                  <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="1"
                  ></circle>
                </svg>
              </button>
            )}
            {!loading && (
              <button
                type="submit"
                disabled={phone.length === 18 ? false : true}
              >
                Войти
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

/*

<svg class="spinner" viewBox="0 0 50 50">
  <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
</svg>

*/
