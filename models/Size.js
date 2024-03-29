import { DataTypes } from 'sequelize';
import { sequelize } from './sqlite';

export const Size = sequelize.define('Size', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

async function addSize(name) {
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

async function getSize(id) {
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

export const apiSize = {
	addSize,
	getSizes,
	getSize,
};
