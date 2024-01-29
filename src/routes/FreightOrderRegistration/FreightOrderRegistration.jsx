import React, { useState } from "react";
import cn from 'classnames';

import "./FreightOrderRegistration.css";
import calendarIcon from "../../images/icons/calendar-2.png";
import dropDownIcon from "../../images/icons/chevron-down.png";

const TEST_TIME = [
  "06:00-08:00",
  "08:00-12:00",
  "12:00-15:00",
  "15:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
	"06:00-08:00",
  "08:00-12:00",
  "12:00-15:00",
  "15:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
	"06:00-08:00",
  "08:00-12:00",
  "12:00-15:00",
  "15:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
];

const FreightOrderRegistration = () => {
  const [isTimeListHidden, setIsTimeListHidden] = useState(true);

	const timeSelectListClassName = cn('timeSelectList', 'scrollable', {
		'hidden': isTimeListHidden,
	})

	const timeSelectListHandler = () => {
		setIsTimeListHidden(!isTimeListHidden);
		console.log(isTimeListHidden)
	}

  return (
    <div className="freigthOrderRegistration">
      <div className="freightOrderRegistration__content">
        <div
					onClick={timeSelectListHandler}
					className="timeSelect"
				>
          <img src={calendarIcon} alt="Иконка календаря" />
          <h3>{TEST_TIME[0]}</h3>
          <img src={dropDownIcon} alt="Раскрыть список" />
        </div>
        <div className={timeSelectListClassName}>
          {TEST_TIME.map((time, index) => (
            <span onClick={() => console.log('test')} className="timeItem" key={index}>{time}</span>
          ))}
        </div>
				<h3>test</h3>
      </div>
    </div>
  );
};

export default FreightOrderRegistration;
