import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { setCode, setIsLoading, setError } from "../../slices/mainReducer";
import { fetchPhone, fetchIsLoading, fetchError } from "../../slices/selectors";

import BackwardButton from "../../components/BackwardButton/BackwardButton";
import Spinner from "../../components/Spinner/Spinner";
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock";

import "./AccessConfirmation.css";

import { TEST_COUNTER_VALUE, TEST_PHONE_CODE } from "../../assets/TEST_CONST";

const AccessConfirmation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phone = useSelector(fetchPhone);

  const [counter, setCounter] = useState<number>(TEST_COUNTER_VALUE);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  const isLoading = useSelector(fetchIsLoading);
  const error = useSelector(fetchError);

  const {
    register,
    handleSubmit,
    watch,
    //formState: { errors },
  } = useForm();

  const resendAccessCode = () => {
    setIsCounting(true);
    setCounter(TEST_COUNTER_VALUE);
  };

  const hidePhoneNumbers = (phone: string) => {
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
      setCounter((prev) => {
        if (prev - 1 === 0) {
          clearInterval(intervalId);
          setIsCounting(false);
        }
        return (prev - 1);
      });
    }, 1000);
  };

  useEffect(() => {
    timer();
  }, [isCounting]);

  const redirectTest = (code: string) => {
    dispatch(setIsLoading());
    if (Number(code) === Number(TEST_PHONE_CODE)) {
      navigate(`/personalDataConfirmation/${phone}`);
    } else {
      dispatch(setError("wrongSmsCode"));
      setTimeout(() => {
        dispatch(setError(''));
      }, 6000);
    }
  };

  const onSubmit = () => {
    const code = Object.values(watch()).join("");
    dispatch(setIsLoading());
    dispatch(setCode(code));
    setTimeout(() => redirectTest(code), 1000);
  };

  const focusNextInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      (e.target.nextSibling as HTMLInputElement)?.focus();
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="accessConfirmation">
          {error && <ErrorBlock show={error ? true : false} error={error} />}
          <div className="accessConfirmation__content">
            <BackwardButton />
            <h4>Введите код из SMS-сообщения</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                onInput={focusNextInput}
                onFocus={(e) => (e.target.value = "")}
                {...register("firstCodeChar", { required: true })}
                type="number"
              />
              <input
                onInput={focusNextInput}
                onFocus={(e) => (e.target.value = "")}
                {...register("secondCodeChar", { required: true })}
                type="number"
              />
              <input
                onInput={focusNextInput}
                onFocus={(e) => (e.target.value = "")}
                {...register("thirdCodeChar", { required: true })}
                type="number"
              />
              <input
                onInput={handleSubmit(onSubmit)}
                onFocus={(e) => (e.target.value = "")}
                {...register("fourthCodeChar", { required: true })}
                type="number"
              />
            </form>
            <h3>
              Вам отправлен код подтверждения на номер -{" "}
              {hidePhoneNumbers(phone)}
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
            <h4 className="marginTop">Введите код из SMS-сообщения</h4>
            <Spinner size="big" color="blue" />
          </div>
        </div>
      )}
    </>
  );
};

export default AccessConfirmation;
