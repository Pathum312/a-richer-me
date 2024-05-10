import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	month: null,
	day: null,
};

export const initializeDate = createAsyncThunk('date/initializeDate', async ({ day, month }) => {
	const date = { day };
	return date;
});

export const setDate = createAction('date/setDate');

const dateSlice = createSlice({
	name: 'date',
	initialState,
	reducers: {
		setDate: (state, action) => {
			const { day, month } = action.payload;
			if (day) state.day = new Date(day).toString();
			if (month) state.month = new Date(month).toString();
		},
	},
	extraReducers: builder => {
		builder.addCase(initializeDate.fulfilled, (state, action) => {
			state.month = new Date().toString();
		});
	},
});

export default dateSlice.reducer;
