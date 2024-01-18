import React, { useState } from 'react';

import './Form.css';

const Form = () => {
  const [coords, setCoords] = useState();
  const [error, setError] = useState(null);
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setError('');
        setCoords(position.coords);
        console.log(navigator);
      },
      (error) => {
        switch(error.code) {
          case 1:
            console.log(navigator);
            console.log(navigator.permissions);
            setError('Вы запретили получение данных геолокации. Разрешите получение данных геолокации в браузере.');
            break;
          case 2:
            setError('Не удалось получить геолокацию.');
            break;
          default: 
           setError('Не удалось получить геолокацию.');
        }
      });
    } else {
      setError("Геолокация не поддерживается.");
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
          //disabled={error ? true : false}
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
          <span>Долгота: {coords.latitude}</span>
          <span>Широта: {coords.longitude}</span>
        </div>
      )}
    </div>
  )
};

export default Form;