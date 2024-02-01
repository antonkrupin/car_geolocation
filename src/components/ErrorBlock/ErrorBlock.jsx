import React from 'react';
import cn from 'classnames';

import i18next from '../../assets/i18next';

import './ErrorBlock.css';

const ErrorBlock = (props) => {
  const { show, error } = props;
  const errorBlockClassName = cn('errorBlock__content', {
    'errorBlock-enter-active': show,
    'errorBlock-exit': !show,
  });

	let errorTitle;
	let errorMessage;

	switch (error) {
		case 'wrongSmsCode':
			errorTitle = i18next.t('errorText.wrongSmsCode.title');
			errorMessage = i18next.t('errorText.wrongSmsCode.message');
			break;
		case 'ordersNotFound': 
			errorTitle = i18next.t('errorText.ordersNotFound.title');
			break;
		case 'outOfRegistrationZone':
			errorTitle = i18next.t('errorText.outOfRegistrationZone.title');
			errorMessage = i18next.t('errorText.outOfRegistrationZone.message');
			break;
		case 'outOfRegistrationCancelingZone':
			errorTitle = i18next.t('errorText.outOfRegistrationCancelingZone.title');
			errorMessage = i18next.t('errorText.outOfRegistrationCancelingZone.message');
			break;
		case 'haveRegesteredOrder':
			errorTitle = i18next.t('errorText.haveRegesteredOrder.title');
			errorMessage = i18next.t('errorText.haveRegesteredOrder.message');
			break;
		case 'bookedLoadingSlot':
			errorTitle = i18next.t('errorText.bookedLoadingSlot.title');
			errorMessage = i18next.t('errorText.bookedLoadingSlot.message');
			break;
		case 'registrationError':
			errorTitle = i18next.t('errorText.registrationError.title');
			errorMessage = i18next.t('errorText.registrationError.message');
			break;
		default:
			errorTitle = 'Вводить только цифры';
			break;
	}

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