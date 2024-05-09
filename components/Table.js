'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import styles from './table.module.css';
import useFetch from '@/middleware/useFetch';

const Table = () => {
	const columns = ['Date', 'Amount', 'Description', 'Category'];

	// This is for the categories dropdown menu in the table
	const categories = {
		Travel: 'Travel',
		Food: 'Food',
		Personal: 'Personal',
		Health: 'Health',
		Home: 'Home',
		Pets: 'Pets',
		Gifts: 'Gifts',
		Utilities: 'Utilities',
	};

	// Expenses data from db
	let { data, error, isPending } = useFetch('http://localhost:3000/api/expenses', 'GET');

	// Filter date
	const [selectedMonth, setSelectedMonth] = useState(new Date());

	// This month is used while getting the finance data.
	const handleMonthChange = date => {
		setSelectedMonth(date);
	};

	// Handles all data changes in the table
	const handleDataChange = async (expense, event, index) => {
		const abortController = new AbortController();
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			signal: abortController.signal,
		};
		const payload = {
			[columns[index - 1].toLowerCase()]: index === 1 ? event : event.target.value,
		};

		// If the row has an id, we will be updating the record.
		// If not, we will be adding a new record.
		if (expense.id) {
			payload['id'] = expense.id;
			payload['type'] = 'UPDATE';
			options['body'] = JSON.stringify(payload);
			console.log({ payload, options });
			await fetch('http://localhost:3000/api/expenses', options);
		} else {
			payload['type'] = 'ADD';
			options['body'] = JSON.stringify(payload);
			console.log({ payload, options });
			await fetch('http://localhost:3000/api/expenses', options);
		}
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
			<div className={styles.container}>
				<div className={styles.title_container}>
					<p className={styles.title}>Expenses</p>
				</div>
				<table className={styles.table}>
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
						{data.map(row => (
							<tr key={row.id} className={styles.row}>
								{Object.values(row).map(
									(value, colIndex) =>
										colIndex !== 0 && (
											<td key={colIndex} className={`${styles.column} ${styles.td}`}>
												{colIndex === 1 ? (
													<Calendar
														selectedDate={value}
														handleDateChange={event => handleDataChange(row, event, colIndex)}
														type={'DAY'}
													/>
												) : colIndex !== 4 ? (
													<input
														type="text"
														value={value}
														onChange={event => handleDataChange(row, event, colIndex)}
														className={styles.input}
													/>
												) : (
													<select
														value={value}
														onChange={event => handleDataChange(row, event, colIndex)}
														className={`${styles.input} ${
															value ? styles[categories[value].toLowerCase()] : ''
														}`}
													>
														<option value="">Select a category</option>
														{Object.values(categories).map((category, index) => (
															<option
																key={index}
																value={category}
																className={value ? styles[categories[value].toLowerCase()] : ''}
															>
																{category}
															</option>
														))}
													</select>
												)}
											</td>
										),
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Table;
