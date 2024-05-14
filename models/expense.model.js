class ExpenseModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	get = async ({ date }) => {
		let where = {};
		if (date) {
			const month = new Date(date);
			const firstDayOfMonth = new Date(
				month.getFullYear(),
				month.getMonth(),
				1,
			);
			const lastDayOfMonth = new Date(
				month.getFullYear(),
				month.getMonth() + 1,
				0,
			);

			where['date'] = { gte: firstDayOfMonth, lte: lastDayOfMonth };
		}

		return await this.prisma.expense.findMany({ where });
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
		// Convert date from string to datetime object
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
