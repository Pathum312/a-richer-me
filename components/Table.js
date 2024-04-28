'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import styles from './table.module.css';

const Table = () => {
	const columns = ['Date', 'Amount', 'Description', 'Category'];
	const data = [
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'something' },
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'something' },
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'something' },
	];
	const [selectedDate, setSelectedDate] = useState(new Date());

	// This month is used while getting the finance data.
	const handleDateChange = date => {
		setSelectedDate(date);
	};

	return (
		<>
			<div className={styles.utils}>
				<Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
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
						<tr key={index} className={styles.row}>
							{Object.values(row).map((value, colIndex) => (
								<td key={colIndex} className={styles.column}>
									{value}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Table;
