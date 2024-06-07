import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

export const GET = async req => {
	const data = await expenseService.get({ date: null });
	const test = data.map(expense => {
		console.log(expense);
		return { ['ok']: 'ok' };
	});
	console.log(test);
	return NextResponse.json({ data }, { status: 200 });
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
