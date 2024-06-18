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
import { assignColor } from '@/middleware/utils';

const CustomGraph = () => {
	const data = [
		{ uber: 200, pickme: 150, name: 'Travel' },
		{ uber_eats: 30, name: 'Food' },
		{ world: 400, name: 'Personal' },
		{ hentai: 120, name: 'School' },
		{ manga: 450, name: 'Home' },
		{ boys: 200, name: 'Pets' },
		{ cats: 125, name: 'Men' },
	];

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
				<Legend
					verticalAlign="right"
					layout="vertical"
					wrapperStyle={{ right: 0 }}
				/>
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

export default CustomGraph;
