import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { setCode } from "../../slices/mainReducer";
import { fetchPhone } from "../../slices/selectors";

import BackwardButton from "../../components/BackwardButton/BackwardButton";
import Spinner from '../../components/Spinner/Spinner';

import "./AccessConfirmation.css";

const TEST_COUNTER_VALUE = 20;
const TEST_PHONE_CODE = '3456';

const AccessConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

	const phone = useSelector(fetchPhone);

  const [counter, setCounter] = useState(TEST_COUNTER_VALUE);
  const [isCounting, setIsCounting] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const resendAccessCode = () => {
    setIsCounting(true);
    setCounter(TEST_COUNTER_VALUE);
  };

  const hidePhoneNumbers = (phone) => {
    return [...phone].map((el, index) => {
      if (index > 4 && index < 9) {
        return "*";
      } else {
        return el;
      }
    });
  };

  const timer = () => {
    const intervalId = setInterval(() => {
      setCounter((prev, curr) => {
        if (prev - 1 === 0) {
          clearInterval(intervalId);
          setIsCounting(false);
        }
        return (curr = prev - 1);
      });
    }, 1000);
  };

  useEffect(() => {
    timer();
    //firstInputRef.current.focus();
  }, [isCounting]);
	
  const redirectTest = () => {
    setLoading(false);
    navigate(`/personalDataConfirmation/${phone}`);
  };

	const onSubmit = (data) => {
		const code = Object.values(watch()).join('');
		if (Number(code) === Number(TEST_PHONE_CODE)) {
      setLoading(true);
			dispatch(setCode(code));
      setTimeout(redirectTest, 2000);
			//navigate(`/personalDataConfirmation/${phone}`);
		}
  };

  return (
    <>
      {!isLoading && (
        <div className="accessConfirmation">
          <div className="accessConfirmation__content">
            <BackwardButton />
            <h4>Введите код из SMS-сообщения</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("firstCodeChar", { required: true, })}
                maxLength="1"
              />
              <input
                {...register("secondCodeChar", { required: true })}
                maxLength="1"
              />
              <input
                {...register("thirdCodeChar", { required: true })}
                maxLength="1"
              />
              <input
                onInput={handleSubmit(onSubmit)}
                {...register("fourthCodeChar", { required: true })}
                maxLength="1"
              />
            </form>
            <h3>
              Вам отправлен код подтверждения на номер - {hidePhoneNumbers(phone)}
            </h3>
    
            <button
              onClick={resendAccessCode}
              disabled={counter !== 0 ? true : false}
            >
              Отправить код повторно {counter !== 0 && <span>({counter})</span>}
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="accessConfirmation">
          <div className="accessConfirmation__content">
            <h4>Введите код из SMS-сообщения</h4>
            <Spinner size="big" color="blue" />
          </div>
        </div>
      )}
    </>
  );
};

export default AccessConfirmation;


