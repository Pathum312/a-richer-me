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
	const handleDataChange = async (expense, { date, amount, description, category }) => {
		const payload = {
			id: expense.id ?? false,
			type: expense.id ? 'UPDATE' : 'ADD',
			date: date ?? (expense.date !== '' ? expense.date : undefined),
			amount: amount ?? (expense.amount !== '' ? expense.amount : null),
			category: category ?? (expense.category !== '' ? expense.category : undefined),
			description: description ?? (expense.description !== '' ? expense.description : null),
		};

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
								{Object.keys(row).map(
									key =>
										key !== 'id' && (
											<td key={key} className={`${styles.column} ${styles.td}`}>
												{key === 'date' ? (
													<Calendar
														date={{ day: row[key] }}
														handleDayChange={event => handleDataChange(row, { [key]: event })}
														type={'DAY'}
													/>
												) : key !== 'category' ? (
													<input
														type="text"
														value={row[key] ? row[key] : ''}
														onChange={event => handleDataChange(row, { [key]: event.target.value })}
														className={styles.input}
													/>
												) : (
													<select
														value={row[key]}
														onChange={event => handleDataChange(row, { [key]: event.target.value })}
														className={`${styles.input} ${
															row[key] ? styles[categories[row[key]].toLowerCase()] : ''
														}`}
													>
														<option value="">Select a category</option>
														{Object.values(categories).map((category, index) => (
															<option
																key={index}
																value={category}
																className={
																	row[key] ? styles[categories[row[key]].toLowerCase()] : ''
																}
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
