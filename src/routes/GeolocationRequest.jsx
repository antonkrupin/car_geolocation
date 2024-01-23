import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
	setCoords,
	setGeolocationAccess,
	setError
} from '../slices/mainReducer';
import { fetchError, fetchGeolocationAccess } from '../slices/selectors';

const GeolocationRequest = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector(fetchError);
	const geolocation = useSelector(fetchGeolocationAccess);
	
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			dispatch(setCoords([position.coords.latitude, position.coords.longitude]));
			dispatch(setGeolocationAccess());
			navigate('/login');
			console.log(geolocation);
		},
		(error) => {
			dispatch(setError('Функционал приложения недоступн без геолокации.'));
		} 
		)
	}, []);

	return (
		<>
			<h1>Geolocation Request</h1>
			{error}
		</>
	)
};

export default GeolocationRequest;