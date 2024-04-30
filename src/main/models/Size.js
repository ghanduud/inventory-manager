import { Size, sequelize, Item } from './sqlite';

async function createSize({ name }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Sizes')) {
			// If the table doesn't exist, create it
			await Size.sync();
			// console.log('Type table created.');
		}

		// Add the provided Type to the table
		await Size.create({
			name: name,
		});
		// console.log(`Type ${name} added.`);
		return { error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { error: `Error adding size` };
	}
}

async function getSizes() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Sizes')) {
			// console.log('Type table does not exist.');
			return { data: [], error: `Size does not exist` };
		}

		// Retrieve all Types from the table
		const allSizes = await Size.findAll();
		// console.log('All Types in the table:', allTypes);

		const sizesData = allSizes.map((size) => ({
			id: size.id,
			name: size.name,
		}));

		return { data: sizesData, error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { data: [], error: `Error getting sizes` };
	}
}

async function getSize({ id }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Sizes')) {
			// console.log('Type table does not exist.');
			return { data: null, error: `Size does not exist` };
		}

		// Retrieve the Type with the specified ID
		const size = await Size.findByPk(id);

		if (!size) {
			// console.log(`Type with ID ${id} not found.`);
			return { data: null, error: `Size does not exist` };
		}

		// console.log('Type:', Type);
		return { data: size, error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { data: null, error: `Error getting size` };
	}
}

async function deleteSize({ id }) {
	try {
		await sequelize.sync();

		const itemWithSize = await Item.findOne({
			where: {
				SizeId: id,
			},
		});

		if (itemWithSize) return { error: `There are items with this size in the inventory` };

		await Size.destroy({
			where: {
				id: id,
			},
		});

		return { error: null };
	} catch (error) {
		return { error: `Error deleting the size` };
	}
}

async function updateSize({ id, name }) {
	try {
		await sequelize.sync();

		const sizeToUpdate = await Size.findByPk(id);

		if (!sizeToUpdate) return { error: `Can not find size to update` };

		sizeToUpdate.name = name;

		await sizeToUpdate.save();

		return { error: null };
	} catch (error) {
		return { error: `Size failed to update` };
	}
}

export const apiSize = {
	createSize,
	getSizes,
	getSize,
	deleteSize,
	updateSize,
};
