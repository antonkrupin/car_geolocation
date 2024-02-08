import React from 'react';

import './ModalWindowBody.css';

export const RoadMap: React.FC = () => {
  return (
    <div className="roadMap">
      <div className="roadMap__content">
        <h1>Схема проезда</h1>
      </div>
    </div>
  )
};

export const HomeScreenAdd: React.FC = () => {
  return (
    <div className="homeScreenAdd">
      <div className="homeScreenAdd__content">
        <h1>Добавить приложение “Электронная очередь” на рабочий экран</h1>
        <h4>Вы можете добавить приложение на экран своего смартфона выполнив эти действия:</h4>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </div>
    </div>
  )
}

