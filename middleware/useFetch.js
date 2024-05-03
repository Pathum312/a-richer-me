import { useState, useEffect } from 'react';

const useFetch = (url, method, payload) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(null);

	useEffect(async () => {
		const abortController = new AbortController();
		const fetchData = async () => {
			try {
				const options = {
					method,
					signal: abortController.signal,
				};
				if (method !== 'GET' || method !== 'DELETE') {
					options['headers'] = { 'Content-Type': 'application/json' };
					options['body'] = JSON.stringify(body);
				}
				const res = await fetch(url, options);
				// If there is no 200 status throw an error
				if (!res.ok) throw new Error('Failed to fetch resource');

				const data = await res.json();
				setData(data);
				setIsPending(false);
				setError(null);
			} catch (error) {
				setError(error.message || 'Something went wrong');
				setIsPending(false);
			}
		};

		// Send the request and receive the data
		await fetchData();

		return abortController.abort();
	}, [url, method, payload]);

	return { data, error, isPending };
};

export default useFetch;
