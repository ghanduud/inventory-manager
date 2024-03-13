import { DataTypes } from 'sequelize';
import { sequelize } from './sqlite';

export const Inventory = sequelize.define('Inventory', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	location: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	maxCapacity: {
		type: DataTypes.INTEGER,
	},
});

async function addInventory(location, maxCapacity = 0) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Category table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			// If the table doesn't exist, create it
			await Inventory.sync();
			// console.log('Category table created.');
		} else {
			// console.log('Category table already exists.');
		}

		// Add the provided Category to the table
		await Inventory.create({
			location: location,
			maxCapacity: maxCapacity,
		});
		// console.log(`Category ${name} added.`);
	} catch (error) {
		// console.error('Error syncing Category model:', error);
	}
}

async function getInventories() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Category table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			// console.log('Category table does not exist.');
			return [];
		}

		// Retrieve all Categorys from the table
		const allInventories = await Inventory.findAll();
		// console.log('All Categorys in the table:', allCategorys);

		return allInventories;
	} catch (error) {
		// console.error('Error syncing Category model:', error);
		return [];
	}
}

async function getInventory(id) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Category table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			// console.log('Category table does not exist.');
			return null;
		}

		// Retrieve the Category with the specified ID
		const Inventory = await Inventory.findByPk(id);

		if (!Inventory) {
			// console.log(`Inventory with ID ${id} not found.`);
			return null;
		}

		// console.log('Inventory:', Inventory);
		return Inventory;
	} catch (error) {
		// console.error('Error syncing Category model:', error);
		return null;
	}
}

export const apiInventory = {
	addInventory,
	getInventories,
	getInventory,
};
