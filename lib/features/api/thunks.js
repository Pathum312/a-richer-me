import axios from 'axios';
import {
	addExpense,
	fetchDataRequest,
	fetchDataSuccess,
	fetchDataFailure,
	addExpenseSuccess,
} from './apiSlice';

const getRequest = async () => {
	const response = await axios.get('http://localhost:3000/api/expenses');
	return response.data;
};

const postRequest = async data => {
	await axios.post('http://localhost:3000/api/expenses', data);
};

export const initilizeData = () => async dispatch => {
	// Update loading and error status
	dispatch(fetchDataRequest());

	try {
		// Get expense lisitng
		const response = await getRequest();
		// Add the expense lisitng to the table
		dispatch(fetchDataSuccess(response));
	} catch (error) {
		// Update loading and error status
		dispatch(fetchDataFailure(error.message));
	}
};

export const postData = data => async dispatch => {
	// Update loading and error status
	dispatch(fetchDataRequest());

	try {
		if (data.id !== '' && data.id) {
			// Updating an exisitng expense record
			dispatch(addExpense(data));
			// Send expense record to DB
			await postRequest(data);
			// Update loading and data status
			dispatch(addExpenseSuccess());
		} else {
			// Adding a new expense record //
			// Send expense record to DB
			await postRequest(data);
			// Get expense lisitng
			const response = await getRequest();
			// Add the expense lisitng to the table
			dispatch(fetchDataSuccess(response));
		}
	} catch (error) {
		// Update loading and error status
		dispatch(fetchDataFailure(error.message));
	}
};
