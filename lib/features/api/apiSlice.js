import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [{ id: '', date: '', amount: '', description: '', category: '' }],
	isLoading: false,
	error: null,
};

const apiSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		fetchDataRequest(state) {
			state.isLoading = true;
			state.error = null;
		},
		fetchDataSuccess(state, action) {
			state.isLoading = false;
			state.data = [...action.payload.data, ...initialState.data];
		},
		fetchDataFailure(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		addExpense(state, action) {
			const isExpenseFound = state.data.find(
				expense => expense.id === action.payload.id,
			);

			if (isExpenseFound) {
				isExpenseFound.date = action.payload.date;
				isExpenseFound.amount = action.payload.amount;
				isExpenseFound.category = action.payload.category;
				isExpenseFound.description = action.payload.description;
			}
		},
		addExpenseSuccess(state) {
			state.isLoading = false;
			state.error = null;
		},
	},
});

export const {
	addExpense,
	fetchDataRequest,
	fetchDataSuccess,
	fetchDataFailure,
	addExpenseSuccess,
} = apiSlice.actions;

export default apiSlice.reducer;
