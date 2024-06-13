import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

export const GET = async req => {
	const data = await expenseService.get({ date: null });
	const currentMonth = new Date().getMonth();
	const previousMonth = currentMonth - 1;

	let monthlyCosts = {};
	let lifetime = 0;
	let previousMonthTotal = 0;
	let currentMonthTotal = 0;

	data.map(expense => {
		const month = expense.date.getMonth();
		monthlyCosts[getMonth(month)] = calculateMonthlyCost(
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
			nextMonth: Math.ceil(getEstimatedMonthlyCost(monthlyCosts)),
			lifetime,
		},
		{ status: 200 },
	);
};

// Calculate monthly cost
const calculateMonthlyCost = (monthlyCost, amount) => {
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

// Calculate the average monthly cost, after calculating the monthly cost
const calculateAverageMonthlyCost = monthlyCosts => {
	let numOfMonths = 0;
	let monthlyCostTotal = 0;

	Object.values(monthlyCosts).map((monthlyCost, index) => {
		numOfMonths++;
		monthlyCostTotal += monthlyCost;
	});

	return monthlyCostTotal / numOfMonths;
};

// Calculate trend factor, which is basically the profit earned compared to the average monthly cost
const calculateTrendFactor = (monthlyCost, averageMonthlyCost) => {
	return (monthlyCost - averageMonthlyCost) / averageMonthlyCost;
};

// Calculate the average trend factor after getting the trend factor total
const calculateAverageTrendFactor = (monthlyCosts, averageMonthlyCost) => {
	let numOfMonths = 0;
	let totalTrendFactor = 0;
	Object.values(monthlyCosts).map((monthlyCost, index) => {
		numOfMonths++;
		totalTrendFactor += calculateTrendFactor(monthlyCost, averageMonthlyCost);
	});
	return totalTrendFactor / numOfMonths;
};

// Multiply the average monthly cost with the average trend factor to get the estimated monthly  cost for the next month
const calculateEstimatedMonthlyCost = (
	averageMonthlyCost,
	averageTrendFactor,
) => {
	return averageMonthlyCost * (1 + averageTrendFactor); // $3000 * (1 + 0.042)%
};

const getEstimatedMonthlyCost = monthlyCosts => {
	const averageMonthlyCost = calculateAverageMonthlyCost(monthlyCosts);
	const averageTrendFactor = calculateAverageTrendFactor(
		monthlyCosts,
		averageMonthlyCost,
	);
	return calculateEstimatedMonthlyCost(averageMonthlyCost, averageTrendFactor);
};
