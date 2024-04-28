'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import styles from './table.module.css';

const Table = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	return (
		<>
			<div className={styles.utils}>
				<Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
			</div>
			<div>
				<p>Table</p>
				<p>Date: {selectedDate.getMonth()}</p>
			</div>
		</>
	);
};

export default Table;
