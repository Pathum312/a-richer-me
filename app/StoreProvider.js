'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';

const StoreProvider = ({ children }) => {
	const storeRef = useRef();
	if (!storeRef.current) {
		// Creates the store instance once it is rendered the first time
		storeRef.current = makeStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
