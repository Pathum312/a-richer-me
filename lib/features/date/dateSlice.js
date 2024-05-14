import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	month: new Date().toISOString(),
	day: null,
};

export const setDate = createAction('date/setDate');

const dateSlice = createSlice({
	name: 'date',
	initialState,
	reducers: {
		setDate: (state, action) => {
			const { day, month } = action.payload;

			if (day) state.day = day.toISOString();
			if (month) state.month = month;
		},
	},
});

export default dateSlice.reducer;
