import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

export const GET = async req => {
	// Give current date this will make the API fetch the current months expenses.
	const date = new Date();
	const data = await expenseService.get({ date });

	let response = [];

	data.map(expense => {
		// Checking if the category is already added or not to the response
		const isCategoryAdded = response.filter(category => category.name === expense.category);
		// Simplify the subcategory name
		const subCategory = expense.description.replace(' ', '_').toLowerCase();

		// If category is not added
		if (isCategoryAdded.length <= 0) {
			const category = { name: expense.category };
			category[`${subCategory}`] = expense.amount;
			response.push(category);
		} else {
			// If category is added, then update the subcategory or add a new subcategory
			isCategoryAdded[0][`${subCategory}`] =
				(isCategoryAdded[0][`${subCategory}`] || 0) + expense.amount;
		}
	});

	return NextResponse.json({ count: response.length, data: response });
};
