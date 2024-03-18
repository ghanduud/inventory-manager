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
		} else {
			// console.log('Type table already exists.');
		}

		// Add the provided Type to the table
		await Size.create({
			name: name,
		});
		// console.log(`Type ${name} added.`);
	} catch (error) {
		// console.error('Error syncing Type model:', error);
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
			return [];
		}

		// Retrieve all Types from the table
		const allSizes = await Size.findAll();
		// console.log('All Types in the table:', allTypes);

		const sizesData = allSizes.map((size) => ({
			id: size.id,
			name: size.name,
		}));

		return sizesData;
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return [];
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
			return null;
		}

		// Retrieve the Type with the specified ID
		const size = await Size.findByPk(id);

		if (!size) {
			// console.log(`Type with ID ${id} not found.`);
			return null;
		}

		// console.log('Type:', Type);
		return size;
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return null;
	}
}

export const apiSize = {
	addSize,
	getSizes,
	getSize,
};
