import apiReducer from './features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './features/date/dateSlice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			api: apiReducer,
			date: dateReducer,
		},
	});
};
