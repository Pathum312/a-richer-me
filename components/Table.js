'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import styles from './table.module.css';
import Image from 'next/image';

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

	// Table data
	const [data, setData] = useState([
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'Travel' },
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'Food' },
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'Personal' },
		{ date: '01/01/2024', amount: '$79.99', description: 'Uber', category: 'Home' },
	]);

	// Filter date
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
								<td
									key={colIndex}
									className={`${styles.column} ${styles.column_data} ${
										colIndex === 3 && categories[value] ? styles[categories[value]] : ''
									}`}
								>
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
