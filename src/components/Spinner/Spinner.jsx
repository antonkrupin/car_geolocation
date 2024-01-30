import React from 'react';
import cn from 'classnames';

import './Spinner.css';

const Spinner = (props) => {
	const { size, color } = props;
	const spinnerClassName = cn ({
		'blueSpinner': color,
		'greySpinner': !color,
		'bigSpinner': size,
		'littleSpinner': !size,
	});
	return (
		<svg className={spinnerClassName} viewBox="0 0 50 50">
			<circle
				className="path"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				strokeWidth="1"
			></circle>
		</svg>
	)
};

export default Spinner;