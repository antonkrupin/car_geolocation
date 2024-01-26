import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "./GeolocationAccess.css";

const GeolocationAccess = () => {
  const navigate = useNavigate();
  const [geolocationAccess, setGeolocationAccess] = useState(true);

  useEffect(() => {
    console.log(navigator);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //dispatch(setCoords([position.coords.latitude, position.coords.longitude]));
        //dispatch(setGeolocationAccess());
        navigate("/login");
      },
      (error) => {
        //dispatch(setError('Функционал приложения недоступн без геолокации.'));
        setGeolocationAccess(false);
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="geolocationAccess">
      {geolocationAccess && (
        <div className="geolocationAccess__content">
          <h3>Предоставьте доступ к геолокации</h3>
          <h4>
            Для корректной работы нашего приложения необходимо предоставить
            доступ к вашей геолокации. Вы можете сделать это в настройках вашего
            телефона.
          </h4>
          <img src="images/icons/pin.png" alt="Pin icon" />
        </div>
      )}
			{!geolocationAccess && (
				<h1>Ошибка доступа</h1>
			)}
    </div>
  );
};

export default GeolocationAccess;
