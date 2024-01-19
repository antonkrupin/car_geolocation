import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	setCoords,
	setError,
} from '../../slices/mainReducer';

import {
	fetchCoords,
	fetchError
} from '../../slices/selectors';

import './Form.css';

const Form = () => {
	const dispatch = useDispatch();
	const error = useSelector(fetchError);
	const coords = useSelector(fetchCoords);

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        dispatch(setError(null));
        dispatch(setCoords([position.coords.latitude, position.coords.longitude]));
      },
      (error) => {
        switch(error.code) {
          case 1:
            //console.log(navigator);
            //console.log(navigator.permissions);
            dispatch(setError('Вы запретили получение данных геолокации. Разрешите получение данных геолокации в браузере.'));
            break;
          case 2:
            dispatch(setError('Не удалось получить геолокацию.'));
            break;
          default: 
           dispatch(setError('Не удалось получить геолокацию.'));
        }
      });
    } else {
      dispatch(setError("Геолокация не поддерживается."));
    }
  }
  const formHandler = (e) => {
    e.preventDefault();
    getPosition();
  }

  return (
    <div className="invoiceForm">
      <form
        onSubmit={formHandler}
        type="submit"
      >
        <input
          required
          placeholder="Номер накладной"
        />
        <button
          type="submit"
          disabled={error ? true : false}
        >
          Получить информацию
        </button>
      </form>
      {error && (
        <div className="formErrors">
          {error}
        </div>
      )}
      {coords && (
        <div className="coords">
          <span>Долгота: {coords[0]}</span>
          <span>Широта: {coords[1]}</span>
        </div>
      )}
    </div>
  )
};

export default Form;