import React from "react";

import "./OutlinedButton.css";

const OutlinedButton = (props) => {
  const { onClick, buttonText, disabled } = props;
  return (
    <button className="outlinedButton" onClick={onClick} disabled={disabled}>
      {buttonText}
    </button>
  );
};

export default OutlinedButton;
