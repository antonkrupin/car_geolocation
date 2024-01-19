import React from 'react';
import { useSelector } from 'react-redux';

import { fetchError } from '../../slices/selectors';

import './ErrorBlock.css';

const ErrorBlock = () => {
	const error = useSelector(fetchError);
	return (
		<div className="errors">
			{error}
		</div>
	)
};

export default ErrorBlock;