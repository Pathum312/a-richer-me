import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: { previousMonth: 0, currentMonth: 0, nextMOnth: 0, lifetime: 0 },
	isLoading: false,
	error: null,
};

const apiSlice = createSlice({
	name: 'widgets',
	initialState,
	reducers: {
		fetchDataRequest(state) {
			state.isLoading = true;
			state.error = null;
		},
		fetchDataSuccess(state, action) {
			state.isLoading = false;
			state.data = action.payload;
		},
		fetchDataFailure(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } =
	apiSlice.actions;

export default apiSlice.reducer;
