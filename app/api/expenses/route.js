import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

// Get the expenses listing
export const GET = async req => {
	// In next we have to extract the query from the request url
	const url = new URL(req.url, `http://${req.headers.host}`);
	// Then from the array of search queries we have to get the specific one we want
	const date = new URLSearchParams(url.searchParams).get('date');
	// Cet expense listing by date or get all expenses unrestricted
	const data = await expenseService.get({ date });
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
