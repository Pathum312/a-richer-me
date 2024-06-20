import axios from 'axios';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './apiSlice';

const getRequest = async () => {
	const response = await axios.get(`http://localhost:3000/api/expenses/get-by-category`);
	return response.data;
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
