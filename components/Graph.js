'use client';

import React from 'react';
import CustomBarChart from './Bar_Chart';
import CustomPieChart from './Pie_Chart';

const CustomGraph = ({ type }) => {
	return (
		<>
			{type === 'bar' ? (
				<CustomBarChart />
			) : type === 'pie' ? (
				<CustomPieChart />
			) : (
				<p>Nothing to show here...</p>
			)}
		</>
	);
};

export default CustomGraph;
