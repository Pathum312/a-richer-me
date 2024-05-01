'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import styles from './table.module.css';
import Image from 'next/image';
import DatePicker from 'react-datepicker';

const Table = () => {
	const columns = ['Date', 'Amount', 'Description', 'Category'];
	const categories = {
		Travel: 'pink',
		Food: 'green',
		Personal: 'red',
		Health: 'blue',
		Home: 'light_pink',
		Pets: 'light_blue',
		Gifts: 'sea_green',
		Utilities: 'orange',
	};

	// Temp data
	const [data, setData] = useState([
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'Travel' },
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'Food' },
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'Personal' },
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'Home' },
	]);

	// Filter date
	const [selectedMonth, setSelectedMonth] = useState(new Date());

	// This month is used while getting the finance data.
	const handleMonthChange = date => {
		setSelectedMonth(date);
	};

	return (
		<>
			<div className={styles.utils}>
				<Calendar
					selectedDate={selectedMonth}
					handleDateChange={handleMonthChange}
					type={'MONTH'}
				/>
			</div>
			<table className={styles.table}>
				<div className={styles.title_container}>
					<p className={styles.title}>Expenses</p>
				</div>
				<thead className={styles.thead}>
					<tr className={styles.row}>
						{columns.map((column, index) => (
							<th key={index} className={`${styles.column} ${styles.column_name}`}>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{data.map((row, index) => (
						<tr className={styles.row}>
							<td key={index} className={`${styles.column} ${styles.td}`}>
								{row.date && (
									<Calendar
										selectedDate={row.date}
										handleDateChange={handleMonthChange}
										type={'DAY'}
									/>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Table;
