import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './features/date/dateSlice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			date: dateReducer,
		},
	});
};
