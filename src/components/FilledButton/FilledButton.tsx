import React from "react";

import "./FilledButton.css";

interface FilledButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  buttonText?: string,
  disabled?: boolean,
  isSpinner?: boolean,
}

const FilledButton: React.FC<FilledButton> = (props) => {
  const { onClick, buttonText, disabled, isSpinner } = props;

  return (
    <>
      {isSpinner && (
        <button onClick={onClick} className="filledButton" type="submit" disabled={disabled}>
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="1"
            ></circle>
          </svg>
        </button>
      )}
      {!isSpinner && (
        <button onClick={onClick} className="filledButton" type="submit" disabled={disabled}>
          {buttonText}
        </button>
      )}
    </>
  );
};

export default FilledButton;
