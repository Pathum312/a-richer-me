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
import React from 'react';

const CustomGraph = () => {
	const data = [
		{ uber: 100, pickme: 15, name: 'travel' },
		{ pedigree: 20, name: 'personal' },
	];

	return (
		<ResponsiveContainer width={'100%'} height={'100%'}>
			<BarChart width={48} height={300} data={data} stacked>
				<XAxis dataKey="name" stroke="#556376" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="uber" stackId="category" fill="#bfe1f6" name="Uber" />
				<Bar dataKey="pickme" stackId="category" fill="#ffcfc9" name="Pickme" />
				<Bar
					dataKey="pedigree"
					stackId="category"
					fill="#ff9393"
					name="Pedigree"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default CustomGraph;
