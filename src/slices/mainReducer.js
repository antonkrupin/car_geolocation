import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	error: null,
	coords: null,
	geolocationAccess: false,
	phone: '',
	orders: [],
	code: '',
	isModalOpen: false,
	isLoading: false,
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
		changeOrder: (state, action) => {
			const { id, status, loadingSlot } = action.payload;
			state.orders[1].forEach((order) => {
				if (order.id === id) {
					order.status = status;
					order.loadingSlot = loadingSlot || order.loadingSlot;
				}
			})
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
		},
		setModalOpen: (state, action) => {
			state.isModalOpen = !state.isModalOpen;
		},
		setIsLoading: (state, action) => {
			state.isLoading = !state.isLoading;
		}
	}
});

export const {
	setCoords,
	setGeolocationAccess,
	changeOrder,
	setPhone,
	setCode,
	setOrders,
	setError,
	setModalOpen,
	setIsLoading
} = slice.actions;

export default slice.reducer;