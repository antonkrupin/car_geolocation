import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	error: null,
	coords: null,
	geolocationAccess: false,
	phone: '',
	orders: [],
	code: '',
}

const slice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setCoords: (state, action) => {
			state.coords = action.payload;
		},
		setGeolocationAccess: (state, action) => {
			state.geolocationAccess = !state.geolocationAccess;
		},
		setPhone: (state, action) => {
			state.phone = action.payload;
		},
		setCode: (state, action) => {
			state.code = action.payload;
		},
		setOrders: (state, action) => {
			state.orders = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		}
	}
});

export const {
	setCoords,
	setGeolocationAccess,
	setPhone,
	setCode,
	setOrders,
	setError,
} = slice.actions;

export default slice.reducer;