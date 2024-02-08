import React from "react";

import "./OutlinedButton.css";

interface OutlinedButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText?: string;
  disabled?: boolean;
}

const OutlinedButton: React.FC<OutlinedButton> = (props) => {
  const { onClick, buttonText, disabled } = props;
  return (
    <button className="outlinedButton" onClick={onClick} disabled={disabled}>
      {buttonText}
    </button>
  );
};

export default OutlinedButton;
