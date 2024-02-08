import React from 'react';

import './TimeSelectItem.css';

interface TimeSelectItem {
  text: string, 
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
}

const TimeSelectItem: React.FC<TimeSelectItem> = (props) => {
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