import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import "./StartPage.css";

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {navigate('/geolocationAccess');}, 3000);
  })

  return (
    <div className="startPage">
      <div className="startPage__content">
        <img src="images/logo.png" alt="Северсталь" />
        <h1>
          Электронная
          <br /> очередь
        </h1>
      </div>
    </div>
  );
};

export default StartPage;
