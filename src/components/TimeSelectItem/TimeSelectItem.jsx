import React from 'react';

import './TimeSelectItem.css';

const TimeSelectItem = (props) => {
  const { onClick, index, text} = props;
  return (
    <span
      onClick={onClick}
      className="timeItem"
      key={index}
    >
      {text}
    </span>
  )
};

export default TimeSelectItem;