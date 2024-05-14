'use client';

import { useEffect } from 'react';
import Calendar from './Calendar';
import styles from './table.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { initilizeData, postData } from '@/lib/features/api/thunks';

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
	const isLoading = useSelector(state => state.api.isLoading);

	// Gets the expense data, and will requestt again, when another dispatch is triggered
	useEffect(() => {
		dispatch(initilizeData());
	}, []);

	// Handles all data changes in the table
	const handleDataChange = async ({
		id,
		date,
		amount,
		description,
		category,
	}) => {
		amount = parseInt(amount);
		if (typeof date !== 'string' && date) date = date.toISOString();
		const payload = {
			id: id ?? false,
			type: id ? 'UPDATE' : 'ADD',
			amount: amount ?? null,
			date: date ? date : null,
			category: category ?? undefined,
			description: description ?? null,
		};

		dispatch(postData(payload));
	};

	return (
		<>
			<div className={styles.utils}>
				{isLoading && <p className={styles.saving}>Saving...</p>}
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
								<th
									key={index}
									className={`${styles.column} ${styles.column_name}`}
								>
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
														handleDayChange={event =>
															handleDataChange({ ...row, [key]: event })
														}
														type={'DAY'}
													/>
												) : key !== 'category' ? (
													<input
														type="text"
														value={row[key] ? row[key] : ''}
														onChange={event =>
															handleDataChange({
																...row,
																[key]: event.target.value,
															})
														}
														className={styles.input}
													/>
												) : (
													<select
														value={row[key]}
														onChange={event =>
															handleDataChange({
																...row,
																[key]: event.target.value,
															})
														}
														className={`${styles.input} ${
															row[key]
																? styles[categories[row[key]].toLowerCase()]
																: ''
														}`}
													>
														<option value="">Select a category</option>
														{Object.values(categories).map(
															(category, index) => (
																<option
																	key={index}
																	value={category}
																	className={
																		row[key]
																			? styles[
																					categories[row[key]].toLowerCase()
																			  ]
																			: ''
																	}
																>
																	{category}
																</option>
															),
														)}
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
