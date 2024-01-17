import React from 'react';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [coords, setCoords] = useState();
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords);
      },
      (error) => {
        console.log('error', error);
        console.log('code', error.code);
        document.getElementById("location").innerHTML = "Пользователь запретил определение геолокации.";
      });
    } else {
      document.getElementById("location").innerHTML = "Геолокация не поддерживается.";
    }
  }
  return (
    <div className="position">
      <button onClick={getPosition}>Get Coords!</button>
      <div className="coords">
        {coords && (
          <>
            <span>
              Широта: {coords.latitude}
            </span>
            <span>
            Долгота: {coords.longitude}
            </span>
          </>
        )}
        <p id="location"></p>
      </div>
    </div>
  )
}

export default App;
