import DatePicker from 'react-datepicker';
import styles from './calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useRef } from 'react';
import { setDate, initializeDate } from '@/lib/features/date/dateSlice';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks';

const Calendar = ({ selectedDate, handleDateChange, type }) => {
	const store = useAppStore();
	const initialized = useRef(false);
	if (!initialized.current) {
		store.dispatch(initializeDate());
		initialized.current = true;
	}
	const dispatch = useAppDispatch();
	const month = useAppSelector(state => state.date.month);
	const day = useAppSelector(state => state.date.day);

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
					selected={day}
					onChange={event => dispatch(setDate({ day: event.toString() }))}
					dateFormat="dd/MM/yyyy"
					className={styles.day}
				/>
			)}
		</>
	);
};

export default Calendar;
