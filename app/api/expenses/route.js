import prisma from '@/prisma.config';
import { NextResponse } from 'next/server';
import ExpenseModel from '@/models/expense.model';
const expenseService = new ExpenseModel({ prisma });

export const GET = async req => {
	const data = await expenseService.get();
	return NextResponse.json({ count: data.length, data }, { status: 200 });
};
