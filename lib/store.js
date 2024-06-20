import apiReducer from './features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './features/date/dateSlice';
import graphReducer from './features/graph-api/apiSlice';
import widgetsReducer from './features/monthly-api/apiSlice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			api: apiReducer,
			date: dateReducer,
			widgets: widgetsReducer,
			graph: graphReducer,
		},
	});
};
