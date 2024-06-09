import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

export const GET = async req => {
	const data = await expenseService.get({ date: null });
	const currentMonth = new Date().getMonth();
	const previousMonth = currentMonth - 1;
	const nextMonth = currentMonth + 1;

	let monthlyCosts = {};
	let lifetime = 0;
	let previousMonthTotal = 0;
	let currentMonthTotal = 0;

	data.map(expense => {
		const month = expense.date.getMonth();
		monthlyCosts[getMonth(month)] = calculateMonthlyCosts(
			monthlyCosts[getMonth(month)] || 0,
			expense.amount,
		);

		switch (expense.date.getMonth()) {
			case currentMonth:
				currentMonthTotal += expense.amount;
				break;
			case previousMonth:
				previousMonthTotal += expense.amount;
				break;
			default:
				break;
		}

		lifetime += expense.amount;
	});

	return NextResponse.json(
		{
			previousMonth: previousMonthTotal,
			currentMonth: currentMonthTotal,
			lifetime,
		},
		{ status: 200 },
	);
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
