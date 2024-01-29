import React from 'react';
import { useNavigate, useLocation } from 'react-router';

import './BackwardButton.css';

const BackwardButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const backButtonHandler = () => {
    navigate(location.state.prev);
  };

  return (
    <div
      onClick={backButtonHandler}
      className="accessConfirmation__backButton"
    >
      <img src="images/icons/back.png" alt="Назад" />
      <h4>Назад</h4>
    </div>
  )
};

export default BackwardButton;