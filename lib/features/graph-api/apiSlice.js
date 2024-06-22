import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
	isLoading: false,
	error: null,
};

const apiSlice = createSlice({
	name: 'graph',
	initialState,
	reducers: {
		fetchDataRequest(state) {
			state.isLoading = true;
			state.error = null;
		},
		fetchDataSuccess(state, action) {
			state.isLoading = false;
			state.data = [...action.payload.data];
		},
		fetchDataFailure(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = apiSlice.actions;

export default apiSlice.reducer;
