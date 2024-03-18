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
	currentCapacity: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
});

async function addInventory(location, maxCapacity = 999999999) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Inventory table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			// If the table doesn't exist, create it
			await Inventory.sync();
			// console.log('Inventory table created.');
		}

		// Add the provided Inventory to the table
		await Inventory.create({
			location: location,
			maxCapacity: maxCapacity,
			currentCapacity: 0, // Set the default currentCapacity to zero
		});
		// console.log(`Inventory added: Location - ${location}, Max Capacity - ${maxCapacity}`);
	} catch (error) {
		console.error('Error adding inventory:', error);
	}
}

async function getInventories() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Inventory table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			return [];
		}

		// Retrieve all inventories from the table with only the necessary attributes
		const allInventories = await Inventory.findAll();

		// Extract necessary attributes from each inventory object
		const inventoriesData = allInventories.map((inventory) => ({
			id: inventory.id,
			location: inventory.location,
			maxCapacity: inventory.maxCapacity,
			currentCapacity: inventory.currentCapacity,
		}));
		return inventoriesData;
	} catch (error) {
		console.error('Error getting inventories:', error);
		return [];
	}
}

async function getInventory(id) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Inventory table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			// console.log('Inventory table does not exist.');
			return null;
		}

		// Retrieve the Inventory with the specified ID
		const inventory = await Inventory.findByPk(id);

		if (!inventory) {
			// console.log(`Inventory with ID ${id} not found.`);
			return null;
		}

		// console.log('Inventory:', inventory);
		return inventory;
	} catch (error) {
		console.error('Error getting inventory:', error);
		return null;
	}
}

export const apiInventory = {
	addInventory,
	getInventories,
	getInventory,
};
