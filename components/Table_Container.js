'use client';

import Table from './Table';
import Calendar from './Calendar';
import styles from './table_container.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '@/lib/features/date/dateSlice';

const TableContainer = () => {
	const dispatch = useDispatch();
	// Get month filter used to filter expense table by month
	const month = useSelector(state => state.date.month);
	// Shows user whether the table data is being saved or not
	const isLoading = useSelector(state => state.api.isLoading);

	// Change month filter
	const handleMonthChange = month => {
		// Cannot set a state to a date object, so convert to string
		dispatch(setDate({ month: month.toISOString() }));
	};

	return (
		<>
			<div className={styles.utils}>
				{isLoading && <p className={styles.saving}>Saving...</p>}
				<Calendar
					date={{ month: new Date(month) }}
					handleDayChange={event => handleMonthChange(event)}
					type={'MONTH'}
				/>
			</div>
			<div className={styles.container}>
				<div className={styles.title_container}>
					<p className={styles.title}>Expenses</p>
				</div>
				<Table />
			</div>
		</>
	);
};

export default TableContainer;
