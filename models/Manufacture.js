import { DataTypes } from 'sequelize';
import { sequelize } from './sqlite';

export const Manufacture = sequelize.define('Manufacture', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phoneNumber: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
});

async function addManufacture(name, phoneNumber, email) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Manufacture table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Manufactures')) {
			// If the table doesn't exist, create it
			await Manufacture.sync();
			// console.log('Manufacture table created.');
		} else {
			// console.log('Manufacture table already exists.');
		}

		// Add the provided manufacture to the table
		await Manufacture.create({
			name: name,
			phoneNumber: phoneNumber,
			email: email,
		});
		// console.log(`Manufacture ${name} added.`);
	} catch (error) {
		// console.error('Error syncing Manufacture model:', error);
	}
}

async function getManufactures() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Manufacture table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Manufactures')) {
			// console.log('Manufacture table does not exist.');
			return [];
		}

		// Retrieve all manufactures from the table
		const allManufactures = await Manufacture.findAll();
		// console.log('All manufactures in the table:', allManufactures);

		return allManufactures;
	} catch (error) {
		// console.error('Error syncing Manufacture model:', error);
		return [];
	}
}

async function getManufacture(id) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Manufacture table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Manufactures')) {
			// console.log('Manufacture table does not exist.');
			return null;
		}

		// Retrieve the manufacture with the specified ID
		const manufacture = await Manufacture.findByPk(id);

		if (!manufacture) {
			// console.log(`Manufacture with ID ${id} not found.`);
			return null;
		}

		// console.log('Manufacture:', manufacture);
		return manufacture;
	} catch (error) {
		// console.error('Error syncing Manufacture model:', error);
		return null;
	}
}

export const apiManufacture = {
	addManufacture,
	getManufactures,
	getManufacture,
};
