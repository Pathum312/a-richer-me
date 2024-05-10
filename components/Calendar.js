import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import styles from './calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { setDate, initializeDate } from '@/lib/features/date/dateSlice';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks';

const Calendar = ({ date, handleDayChange, type }) => {
	// Call the redux store
	const store = useAppStore();
	const initialized = useRef(false);
	// Initialize the date reducer
	if (!initialized.current) {
		store.dispatch(initializeDate(date));
		initialized.current = true;
	}
	// This is used to update the state in a reducer
	const dispatch = useAppDispatch();
	// Called the month state from the date reducer
	const month = useAppSelector(state => state.date.month);

	return (
		<>
			{/* Month Picker */}
			{type === 'MONTH' && (
				<DatePicker
					selected={month}
					onChange={event => dispatch(setDate({ month: event.toString() }))}
					dateFormat="MMMM YYYY"
					placeholderText="Select a month"
					monthsShown={1}
					showMonthYearPicker
					className={styles.month}
				/>
			)}

			{/* Day Picker */}
			{type === 'DAY' && (
				<DatePicker
					selected={date.day}
					onChange={handleDayChange}
					dateFormat="dd/MM/yyyy"
					className={styles.day}
				/>
			)}
		</>
	);
};

export default Calendar;
