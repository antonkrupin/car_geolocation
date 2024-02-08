import React from 'react';
import { useNavigate } from 'react-router';

// import backArrow from '../../images/icons/backArrow.png';
import { IMAGES } from '../../images/Images';

import './BackwardButton.css';

const BackwardButton: React.FC = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={backButtonHandler}
      className="backwardButton"
    >
      <img src={IMAGES.backArrow} alt="Назад" />
      <h4 className="bacwardButton__text">Назад</h4>
    </div>
  )
};

export default BackwardButton;