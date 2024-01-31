import React from 'react';

import './TimeSelectItem.css';

const TimeSelectItem = (props) => {
  const { onClick, text} = props;
  return (
    <span
      onClick={onClick}
      className="timeItem"
    >
      {text}
    </span>
  )
};

export default TimeSelectItem;