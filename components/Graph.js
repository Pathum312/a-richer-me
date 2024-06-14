'use client';

import {
	Bar,
	XAxis,
	YAxis,
	Legend,
	Tooltip,
	BarChart,
	ResponsiveContainer,
} from 'recharts';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initilizeData } from '@/lib/features/api/thunks';

const CustomGraph = () => {
	const data = [
		{ amount: 100, description: 'uber', category: 'travel' },
		{ amount: 15, description: 'pickme', category: 'travel' },
		{ amount: 20, description: 'pedigree', category: 'personal' },
	];

	return (
		<ResponsiveContainer width={'100%'} height={'100%'}>
			<BarChart width={48} height={48} data={data}>
				<XAxis dataKey="category" stroke="#556376" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar key="description" dataKey="amount" stackId="a" fill="#8884d8" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default CustomGraph;
