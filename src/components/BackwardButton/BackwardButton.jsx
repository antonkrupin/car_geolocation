import React from 'react';
import { useNavigate, useLocation } from 'react-router';

import backArrow from '../../images/icons/backArrow.png';
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
      className="backwardButton"
    >
      <img src={backArrow} alt="Назад" />
      <h4 className="bacwardButton__text">Назад</h4>
    </div>
  )
};

export default BackwardButton;