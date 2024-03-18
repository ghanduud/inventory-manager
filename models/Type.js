import { DataTypes } from 'sequelize';
import { sequelize } from './sqlite';

export const Type = sequelize.define('Type', {
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

async function addType(name) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Types')) {
			// If the table doesn't exist, create it
			await Type.sync();
			// console.log('Type table created.');
		} else {
			// console.log('Type table already exists.');
		}

		// Add the provided Type to the table
		await Type.create({
			name: name,
		});
		// console.log(`Type ${name} added.`);
	} catch (error) {
		// console.error('Error syncing Type model:', error);
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
			return [];
		}

		// Retrieve all Types from the table
		const allTypes = await Type.findAll();
		// console.log('All Types in the table:', allTypes);

		const typesData = allTypes.map((type) => ({
			id: type.id,
			name: type.name,
		}));

		return typesData;
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return [];
	}
}

async function getType(id) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Types')) {
			// console.log('Type table does not exist.');
			return null;
		}

		// Retrieve the Type with the specified ID
		const Type = await Type.findByPk(id);

		if (!Type) {
			// console.log(`Type with ID ${id} not found.`);
			return null;
		}

		// console.log('Type:', Type);
		return Type;
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return null;
	}
}

export const apiType = {
	addType,
	getTypes,
	getType,
};
