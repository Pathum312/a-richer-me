import DatePicker from 'react-datepicker';
import styles from './calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ date, handleDayChange, type }) => {
	return (
		<>
			{/* Month Picker */}
			{type === 'MONTH' && (
				<DatePicker
					selected={date.month}
					onChange={handleDayChange}
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
