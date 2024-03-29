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

async function addInventory({ location, maxCapacity }) {
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

		return { error: null };
	} catch (error) {
		return { error: `error in adding inventory` };
	}
}

async function getInventories() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Inventory table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			return { data: [], error: null };
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
		return { data: inventoriesData, error: null };
	} catch (error) {
		return { data: [], error: `Error getting inventories:` };
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
			// return null;
			return { data: null, error: `No inventory found` };
		}

		// Retrieve the Inventory with the specified ID
		const inventory = await Inventory.findByPk(id);

		if (!inventory) {
			// console.log(`Inventory with ID ${id} not found.`);
			return { data: null, error: `No inventory found` };
		}

		// console.log('Inventory:', inventory);
		return { data: inventory, error: null };
	} catch (error) {
		return { data: null, error: `No inventory found` };
	}
}

async function deleteInventory(id) {
	try {
		// Get the inventory with the specified ID
		const inventoryToDelete = await Inventory.findByPk(id);

		// Check if the inventory exists
		if (!inventoryToDelete) {
			return { error: `Inventory with ID ${id} not found.` };
		}

		// Check if the current capacity is zero
		if (inventoryToDelete.currentCapacity !== 0) {
			return { error: `Inventory is not empty to delete.` };
		}

		// Delete the inventory
		await inventoryToDelete.destroy();

		return { error: null };
	} catch (error) {
		console.error('Error deleting inventory:', error);
		return { error: 'An error occurred while deleting the inventory.' };
	}
}

async function updateInventory({ id, location, maxCapacity }) {
	try {
		// Get the inventory with the specified ID
		const inventoryToEdit = await Inventory.findByPk(id);

		// Check if the inventory exists
		if (!inventoryToEdit) {
			return { error: `Inventory with ID ${id} not found.` };
		}

		// Update the inventory properties
		inventoryToEdit.location = location;
		inventoryToEdit.maxCapacity = maxCapacity;

		// Save the changes to the database
		await inventoryToEdit.save();

		return { error: null };
	} catch (error) {
		return { error: 'An error occurred while editing the inventory.' };
	}
}

export const apiInventory = {
	addInventory,
	getInventories,
	getInventory,
	deleteInventory,
	updateInventory,
};
