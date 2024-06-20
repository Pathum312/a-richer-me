import { Bar, XAxis, YAxis, Legend, Tooltip, BarChart, ResponsiveContainer } from 'recharts';
import React, { useEffect } from 'react';
import { assignColor } from '@/middleware/utils';
import { useSelector, useDispatch } from 'react-redux';
import { initilizeData } from '@/lib/features/graph-api/thunks';

const CustomBarChart = () => {
	const dispatch = useDispatch();
	// Expenses data that will populate the widgets
	const data = useSelector(state => state.graph.data);

	// Gets the monthly expenses for the widgets, is triggered every render of the page
	useEffect(() => {
		dispatch(initilizeData());
	}, []);

	const getSubCategories = data.map(expenses => {
		const { name, ...rest } = expenses;
		return Object.keys(rest);
	});

	const subCategories = getSubCategories.flat();

	return (
		<ResponsiveContainer width={'100%'} height={'100%'}>
			<BarChart width={48} height={300} data={data} stacked>
				<XAxis dataKey="name" stroke="#556376" />
				<YAxis />
				<Tooltip />
				<Legend verticalAlign="right" layout="vertical" wrapperStyle={{ right: 0 }} />
				{subCategories.map(subCategory => (
					<Bar
						dataKey={subCategory}
						stackId="category"
						fill={`#${assignColor()}`}
						name={subCategory.replace('_', ' ').toUpperCase()}
					/>
				))}
			</BarChart>
		</ResponsiveContainer>
	);
};

export default CustomBarChart;
