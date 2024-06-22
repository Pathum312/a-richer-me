'use client';

import { useEffect } from 'react';
import Widget from './Widget';
import { useSelector, useDispatch } from 'react-redux';
import { initilizeData } from '@/lib/features/monthly-api/thunks';

const WidgetList = () => {
	const dispatch = useDispatch();
	// Expenses data that will populate the widgets
	const data = useSelector(state => state.widgets.data);
	// Checks if the data is still being fetched
	const isLoading = useSelector(state => state.widgets.isLoading);

	// Gets the monthly expenses for the widgets, is triggered every render of the page
	useEffect(() => {
		dispatch(initilizeData());
	}, []);

	return (
		<>
			<Widget
				title={'Current month'}
				value={!isLoading ? `$${data.currentMonth}` : 'Loading...'}
			/>
			<Widget
				title={'Previous month'}
				value={!isLoading ? `$${data.previousMonth}` : 'Loading...'}
			/>
			<Widget
				title={'Next month'}
				value={!isLoading ? `$${data.nextMonth}` : 'Loading...'}
			/>
			<Widget
				title={'Lifetime'}
				value={!isLoading ? `$${data.lifetime}` : 'Loading...'}
			/>
		</>
	);
};

export default WidgetList;
