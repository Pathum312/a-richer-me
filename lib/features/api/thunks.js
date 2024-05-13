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
	dispatch(fetchDataRequest());

	try {
		const response = await getRequest();
		dispatch(fetchDataSuccess(response));
	} catch (error) {
		dispatch(fetchDataFailure(error.message));
	}
};

export const postData = data => async dispatch => {
	dispatch(fetchDataRequest());

	try {
		if (data.id !== '' && data.id) {
			dispatch(addExpense(data));
			await postRequest(data);
			dispatch(addExpenseSuccess());
		} else {
			await postRequest(data);
			const response = await getRequest();
			dispatch(fetchDataSuccess(response));
		}
	} catch (error) {
		dispatch(fetchDataFailure(error.message));
	}
};
