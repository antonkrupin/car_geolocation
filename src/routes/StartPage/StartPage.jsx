import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import "./StartPage.css";

const StartPage = () => {
  const navigate = useNavigate();

  //navigate('/geolocationAccess');

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
