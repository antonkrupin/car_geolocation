import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from 'classnames';

import { setModalOpen, changeOrder } from "../../slices/mainReducer";
import { fetchIsModalOpen, fetchIsLoading } from "../../slices/selectors";

import FreightOrderRegistration from "../../routes/FreightOrderRegistration/FreightOrderRegistration";
import closeButton from "../../images/icons/closeButton.png";

import "./ModalWindow.css";

const ModalWindow = (props) => {
	const { id, modalBody } = props;

  const dispatch = useDispatch();
  const isModalOpen = useSelector(fetchIsModalOpen);
	const isLoading = useSelector(fetchIsLoading);

	const modalWindowOverlayClassName = cn('modalWindowOverlay', {
		'closed': !isModalOpen,
	});

	const modalWindowClassName = cn('modalWindow', {
		'withBody': modalBody,
	})

	const closeModalHandler = () => {
    dispatch(setModalOpen());
  };

	const confirmRegistrationCanceling = () => {
		dispatch(changeOrder({ id: id, status: 0 }));
		dispatch(setModalOpen());
	};

  return (
		<>
		 {!modalBody && (
			<div
				className={modalWindowOverlayClassName}>
				<div className={modalWindowClassName}>
					<button
						onClick={closeModalHandler}
						className="closeModalButton">
						<img src={closeButton} alt="Закрыть модальное окно" />
					</button>
					<h3>Отмена регистрации</h3>
					<h4>Вы действительно хотите отменить регистрацию?</h4>
					<div>
						<button
							type="submit"
							onClick={confirmRegistrationCanceling}
							className="confirmCancelButton">
							Подтвердить отмену
						</button>
					</div>
				</div>
			</div>
		 )}
		 {modalBody && (
			<div
				className={modalWindowOverlayClassName}>
				<div className={modalWindowClassName}>
					{!isLoading && (
						<button
							onClick={closeModalHandler}
							className="closeModalButton">
							<img src={closeButton} alt="Закрыть модальное окно" />
						</button>
					)}
					<FreightOrderRegistration />
				</div>
			</div>
		 )}
		</>
    
  );
};

export default ModalWindow;