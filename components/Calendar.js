import DatePicker from 'react-datepicker';
import styles from './calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ selectedDate, handleDateChange, type }) => {
	return (
		<>
			{/* Month Picker */}
			{type === 'MONTH' && (
				<DatePicker
					selected={selectedDate}
					onChange={handleDateChange}
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
					selected={selectedDate}
					onChange={handleDateChange}
					dateFormat="dd/MM/yyyy"
					className={styles.day}
				/>
			)}
		</>
	);
};

export default Calendar;
