import React from 'react';
import ReactModal from 'react-modal';

import './ModalWindow.css';

const ModalWindow = (props) => {
	const { isOpen } = props;
	ReactModal.setAppElement('#root');
	return (
		<ReactModal isOpen={isOpen} className="modalStyle" ariaHideApp={false}>
			<p>Content</p>
		</ReactModal>
	)
};

export default ModalWindow;