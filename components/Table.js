'use client';

import { useEffect } from 'react';
import Calendar from './Calendar';
import styles from './table.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, postData } from '@/lib/features/api/thunks';

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

	const dispatch = useDispatch();
	// Expenses data that will populate the table
	const data = useSelector(state => state.api.data);

	// Gets the expense data, and will requestt again, when another dispatch is triggered
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	// Handles all data changes in the table
	const handleDataChange = async (expense, event, index) => {
		const payload = {
			[columns[index - 1].toLowerCase()]: index === 1 ? event : event.target.value,
		};

		if (expense.id) {
			payload['id'] = expense.id;
			payload['type'] = 'UPDATE';
		} else payload['type'] = 'ADD';

		dispatch(postData(payload));
	};

	return (
		<>
			<div className={styles.utils}>
				<Calendar type={'MONTH'} />
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
														date={{ day: value }}
														handleDayChange={event => handleDataChange(row, event, colIndex)}
														type={'DAY'}
													/>
												) : colIndex !== 4 ? (
													<input
														type="text"
														value={value ? value : ''}
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
