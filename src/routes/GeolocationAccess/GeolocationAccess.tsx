import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { fetchGeolocationAccess } from "../../slices/selectors";
import { setCoords, setGeolocationAccess } from "../../slices/mainReducer";

import "./GeolocationAccess.css";

const GeolocationAccess: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const geolocationAccess = useSelector(fetchGeolocationAccess);
  //const [geolocationAccess, setGeolocationAccess] = useState<boolean>(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(setCoords([position.coords.latitude, position.coords.longitude]));
        dispatch(setGeolocationAccess(true));
        navigate("/login");
      },
      (error) => {
        //dispatch(setError('Функционал приложения недоступен без геолокации.'));
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
