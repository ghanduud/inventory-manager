import { sequelize, Item, Type } from './sqlite';

async function createType({ name }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Types')) {
			// If the table doesn't exist, create it
			await Type.sync();
			// console.log('Type table created.');
		}

		// Add the provided Type to the table
		await Type.create({
			name: name,
		});
		// console.log(`Type ${name} added.`);

		return { error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { error: `Error adding Type` };
	}
}

async function getTypes() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Types')) {
			// console.log('Type table does not exist.');
			return { data: [], error: `Type does not exist` };
		}

		// Retrieve all Types from the table
		const allTypes = await Type.findAll();
		// console.log('All Types in the table:', allTypes);

		const typesData = allTypes.map((type) => ({
			id: type.id,
			name: type.name,
		}));

		return { data: typesData, error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { data: [], error: `Error getting type` };
	}
}

async function getType({ id }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Types')) {
			// console.log('Type table does not exist.');
			return { data: null, error: `Type does not exist` };
		}

		// Retrieve the Type with the specified ID
		const type = await Type.findByPk(id);

		if (!type) {
			// console.log(`Type with ID ${id} not found.`);
			return { data: null, error: `Type does not exist` };
		}

		// console.log('Type:', Type);
		return { data: type, error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { data: null, error: `Error getting type` };
	}
}

async function deleteType({ id }) {
	try {
		await sequelize.sync();

		const itemWithType = await Item.findOne({
			where: {
				TypeId: id,
			},
		});

		if (itemWithType) return { error: `There are items with this type in the inventory` };

		await Type.destroy({
			where: {
				id: id,
			},
		});

		return { error: null };
	} catch (error) {
		return { error: `Error deleting the type` };
	}
}

async function updateType({ id, name }) {
	try {
		await sequelize.sync();

		const typeToUpdate = await Type.findByPk(id);

		if (!typeToUpdate) return { error: `Can not find type to update` };

		typeToUpdate.name = name;

		await typeToUpdate.save();

		return { error: null };
	} catch (error) {
		return { error: `Type failed to update` };
	}
}

export const apiType = {
	createType,
	getTypes,
	getType,
	deleteType,
	updateType,
};
