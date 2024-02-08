import { createSlice } from '@reduxjs/toolkit';

type State = {
	error: string,
	coords: number[],
	geolocationAccess: boolean,
	phone: string,
	personalData: string[],
	orders: {
		id: string,
		status: number,
		city: string,
		address: string,
		storage: string,
		enterDate: string,
		loadingSlot: string,
		carNumber: string,
		priority: string,
	}[],
	code: string,
	isModalOpen: boolean,
	isLoading: boolean,
}

const initialState: State = {
	error: '',
	coords: [],
	geolocationAccess: false,
	phone: '',
	personalData: [],
	orders: [
		{
			id: "410045634",
			status: 0,
			city: "Череповец",
			address: "г. Череповец, улица 8-го марта, дом 54",
			storage: "324-Череповец-М",
			enterDate: "12.02.24",
			loadingSlot: "11:00-16:00",
			carNumber: "a202aa",
			priority: "1",
		},
	],
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
			state.geolocationAccess = action.payload;
		},
		changeOrder: (state, action) => {
			const { id, status, loadingSlot } = action.payload;
			state.orders.forEach((order: {id: string, status: number, loadingSlot: string}) => {
				if (order.id === id) {
					order.status = status;
					order.loadingSlot = loadingSlot || order.loadingSlot;
				}
			})
		},
		setPersonalData: (state, action) => {
			state.personalData = action.payload;
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
		setModalOpen: (state) => {
			state.isModalOpen = !state.isModalOpen;
		},
		setIsLoading: (state) => {
			state.isLoading = !state.isLoading;
		}
	}
});

export const {
	setCoords,
	setGeolocationAccess,
	changeOrder,
	setPersonalData,
	setPhone,
	setCode,
	setOrders,
	setError,
	setModalOpen,
	setIsLoading
} = slice.actions;

export default slice.reducer;