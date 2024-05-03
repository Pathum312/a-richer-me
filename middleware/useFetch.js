import { useState, useEffect } from 'react';

const useFetch = (url, method, payload) => {
	const [data, setData] = useState([
		{ id: '', date: '', amount: '', description: '', category: '' },
	]);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();
		const fetchData = async () => {
			try {
				const options = {
					method,
					signal: abortController.signal,
				};
				if (method !== 'GET' && method !== 'DELETE') {
					options['headers'] = { 'Content-Type': 'application/json' };
					options['body'] = JSON.stringify(body);
				}
				const res = await fetch(url, options);
				// If there is no 200 status throw an error
				if (!res.ok) throw new Error('Failed to fetch resource');

				const temp = await res.json();
				const expenses = temp.data;
				const response = [
					...expenses,
					{ id: '', date: '', amount: '', description: '', category: '' },
				];
				setData(response);
				setIsPending(false);
				setError(null);
			} catch (error) {
				setError(error.message || 'Something went wrong');
				setIsPending(false);
			}
		};

		// Send the request and receive the data
		const timeoutId = setTimeout(fetchData, 1000);

		return () => {
			clearTimeout(timeoutId);
			abortController.abort();
		};
	}, [url, method, payload]);

	return { data, error, isPending };
};

export default useFetch;
