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
			const { id, date, amount, description, category } = action.payload;

			if (date || amount || description || category) {
				// If the four main values are not null, then update the expense to the array
				const isExpenseFound = state.data.find(expense => expense.id === id);

				if (isExpenseFound) {
					isExpenseFound.date = date;
					isExpenseFound.amount = amount;
					isExpenseFound.category = category;
					isExpenseFound.description = description;
				}
			} else {
				// If the four main values are null, then remove the expense from the array
				const expenseExcludedArray = state.data.filter(
					expense => expense.id !== id,
				);

				state.data = expenseExcludedArray;
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
