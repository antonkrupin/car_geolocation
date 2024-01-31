import React from 'react';
import cn from 'classnames';

import './ErrorBlock.css';

const ErrorBlock = (props) => {
  const { show, errorTitle, errorMessage } = props;
  const errorBlockClassName = cn('errorBlock__content', {
    'errorBlock-enter-active': show,
    'errorBlock-exit': !show,
  })
  return (
    <div className="errorBlock">
      <div className={errorBlockClassName}>
        <h5 className="errorTitle">{errorTitle}</h5>
        <h6 className="errorMessage">{errorMessage}</h6>
      </div>
    </div>
  )
};

export default ErrorBlock;