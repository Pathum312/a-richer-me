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
		{ uber: 200, pickme: 150, name: 'travel' },
		{ uber_eats: 30, name: 'food' },
		{ pedigree: 400, name: 'personal' },
		{ pedigree: 120, name: 'school' },
		{ pedigree: 450, name: 'home' },
		{ pedigree: 200, name: 'pets' },
		{ pedigree: 125, name: 'men' },
	];

	return (
		<ResponsiveContainer width={'100%'} height={'100%'}>
			<BarChart width={48} height={300} data={data} stacked>
				<XAxis dataKey="name" stroke="#556376" />
				<YAxis />
				<Tooltip />
				<Legend
					verticalAlign="right"
					layout="vertical"
					wrapperStyle={{ right: 0 }}
				/>
				<Bar dataKey="uber" stackId="category" fill="#bfe1f6" name="Uber" />
				<Bar dataKey="pickme" stackId="category" fill="#ffcfc9" name="Pickme" />
				<Bar
					dataKey="uber_eats"
					stackId="category"
					fill="#ffcfc9"
					name="Uber Eats"
				/>
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
