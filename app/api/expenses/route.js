import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

// Get the expenses listing
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

// Add / Update the expense record
export const POST = async req => {
	try {
		const { id, date, amount, description, category, type } = await req.json();
		try {
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
			return NextResponse.json({ message: 'Expense added.' }, { status: 200 });
		} catch (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
