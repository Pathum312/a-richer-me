class ExpenseModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	get = async () => {
		return await this.prisma.expense.findMany();
	};

	create = async ({ date, amount, description, category }) => {
		return await this.prisma.expense.create({
			data: { date, amount, description, category },
		});
	};

	update = async ({ id, date, amount, description, category, type }) => {
		// Amount sent in the req is string, we have to convert to int
		// If statement is important otherwise the amount will also be updated as null
		if (amount) amount = parseInt(amount);
		if (typeof date === 'string') date = new Date(date);
		// Common data for both adding and updating the records
		let data = { date, amount, description, category };
		switch (type) {
			// If update, update an existing record
			case 'UPDATE':
				if (date || amount || description || category) {
					return await this.prisma.expense.update({ where: { id }, data });
					// If the payload doesn't have any of the common data, then delete the record
				} else return await this.destroy({ id });
			// If add, create a new record
			case 'ADD':
				return await this.prisma.expense.create({ data });
			default:
				break;
		}
	};

	destroy = async ({ id }) => {
		return await this.prisma.expense.delete({ where: { id } });
	};
}

export default ExpenseModel;
