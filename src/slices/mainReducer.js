import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	error: null,
	coords: null,
}

const slice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setCoords: (state, action) => {
			console.log(action.payload);
			state.coords = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		}
	}
});

export const {
	setCoords,
	setError,
} = slice.actions;

export default slice.reducer;