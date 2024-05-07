import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

export const GET = async req => {
	const data = await expenseService.get();
	return NextResponse.json(
		{
			count: data.length,
			data,
		},
		{ status: 200 },
	);
};

// Test
export const POST = async req => {
	try {
		const { id, date, amount, description, category, type } = req.body;
		// Add, Update or Delete a record.
		const res = await expenseService.update({
			id,
			date,
			amount,
			description,
			category,
			type,
		});
		// Returm a confirmation response
		return NextResponse.json({ message: res }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
};
