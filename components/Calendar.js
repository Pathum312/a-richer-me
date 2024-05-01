import DatePicker from 'react-datepicker';
import styles from './calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ selectedDate, handleDateChange }) => {
	return (
		<DatePicker
			selected={selectedDate}
			onChange={handleDateChange}
			dateFormat="MMMM YYYY"
			placeholderText="Select a month"
			monthsShown={1}
			showMonthYearPicker
			className={styles.calendar}
		/>
	);
};

export default Calendar;
