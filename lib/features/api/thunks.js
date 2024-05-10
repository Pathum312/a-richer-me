import axios from 'axios';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './apiSlice';

export const fetchData = () => async dispatch => {
	dispatch(fetchDataRequest());

	try {
		const response = await axios.get('http://localhost:3000/api/expenses');
		dispatch(fetchDataSuccess(response.data));
	} catch (error) {
		dispatch(fetchDataFailure(error.message));
	}
};

export const postData = data => async dispatch => {
	try {
		await axios.post('http://localhost:3000/api/expenses', data);
		dispatch(fetchData());
	} catch (error) {
		dispatch(fetchDataFailure(error.message));
	}
};
