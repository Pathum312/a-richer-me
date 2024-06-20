'use client';

import React from 'react';
import CustomBarChart from './Bar_Chart';

const CustomGraph = ({ type }) => {
	return (
		<>
			{type === 'bar' ? (
				<CustomBarChart />
			) : type === 'pie' ? (
				<p>Pie Chart</p>
			) : (
				<p>Nothing to show here...</p>
			)}
		</>
	);
};

export default CustomGraph;
