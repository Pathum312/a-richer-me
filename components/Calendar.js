import DatePicker from 'react-datepicker';
import styles from './calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ selectedDate, handleDateChange }) => {
	return (
		<DatePicker
			selected={selectedDate}
			onChange={handleDateChange}
			dateFormat="MMMM YYYY"
			placeholderText="Select a date"
			startDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
			endDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
			monthsShown={1}
			showMonthYearPicker
			className={styles.calendar}
		/>
	);
};

export default Calendar;
