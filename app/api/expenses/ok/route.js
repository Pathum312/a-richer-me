import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

export const GET = async req => {
	const data = await expenseService.get({ date: null });
	let monthlyCosts = {};
	let lifetimeCost = 0;
	data.map(expense => {
		const month = expense.date.getMonth();
		monthlyCosts[getMonth(month)] = calculateMonthlyCosts(
			monthlyCosts[getMonth(month)] || 0,
			expense.amount,
		);
		lifetimeCost += expense.amount;
	});
	console.log({ monthlyCosts, lifetime: lifetimeCost });
	return NextResponse.json({ data }, { status: 200 });
};

// Calculate monthly cost
const calculateMonthlyCosts = (monthlyCost, amount) => {
	return monthlyCost + amount;
};

const getMonth = month => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return months[month - 1];
};

const calculateTrendFactor = (monthlyCost, averageMonthlyCost) => {
	return ((monthlyCost - averageMonthlyCost) / averageMonthlyCost) * 100;
};

const calculateAverageTrendFactor = (totalTrendFactor, numOfMonths) => {
	return totalTrendFactor / numOfMonths;
};

const calculateEstimatedMonthlyCost = (
	averageMonthlyCost,
	averageTrendFactor,
) => {
	return averageMonthlyCost * (1 + averageTrendFactor);
};

const getEstimatedMonthlyCost = () => {};
