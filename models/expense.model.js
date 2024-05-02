class ExpenseModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	get = async () => {
		return await this.prisma.expense.findMany();
	};
}

export default ExpenseModel;
