import React, { useEffect } from 'react';
import { assignColor } from '@/middleware/utils';
import { useSelector, useDispatch } from 'react-redux';
import { initilizeData } from '@/lib/features/api/thunks';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

const CustomPieChart = () => {
	const dispatch = useDispatch();
	// Expenses data that will populate the widgets
	const data = useSelector(state => state.api.data);
	// Get month filter used to filter expense table by month
	const month = useSelector(state => state.date.month);

	// Gets the expense data, and will requestt again, when another dispatch is triggered
	useEffect(() => {
		dispatch(initilizeData(month));
	}, []);

	let formattedData = [];

	data.map(expense => {
		const isCategoryAdded = formattedData.filter(category => category.name === expense.category);

		if (expense.category !== '') {
			if (isCategoryAdded.length <= 0) {
				formattedData.push({ name: expense.category, value: expense.amount });
			} else {
				isCategoryAdded[0]['value'] = (isCategoryAdded[0]['value'] || 0) + expense.amount;
			}
		}
	});

	const COLORS = [
		'#e6cff2',
		'#bb49f6',
		'#d4edbc',
		'#5c9723',
		'#ff9393',
		'#b10202',
		'#bfe1f6',
		'#0e6ba4',
		'#ffcfc9',
		'#f94f3a',
		'#c6dbe1',
		'#258ca9',
		'#72dbfd',
		'#215a6c',
		'#ffc8aa',
		'#ec6319',
	];

	return (
		<ResponsiveContainer width={'100%'} height={'100%'}>
			<PieChart width={400} height={400}>
				<Pie
					data={formattedData}
					dataKey="value"
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill={`#${assignColor()}`}
					labelLine={true}
					label
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
};

export default CustomPieChart;
