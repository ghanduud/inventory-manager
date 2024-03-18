import { DataTypes } from 'sequelize';
import { sequelize } from './sqlite';

export const Material = sequelize.define('Material', {
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

async function addMaterial(name) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Materials')) {
			// If the table doesn't exist, create it
			await Material.sync();
			// console.log('Type table created.');
		} else {
			// console.log('Type table already exists.');
		}

		// Add the provided Type to the table
		await Material.create({
			name: name,
		});
		// console.log(`Type ${name} added.`);
	} catch (error) {
		// console.error('Error syncing Type model:', error);
	}
}

async function getMaterials() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Materials')) {
			// console.log('Type table does not exist.');
			return [];
		}

		// Retrieve all Types from the table
		const allMaterials = await Material.findAll();
		// console.log('All Types in the table:', allTypes);

		const materialsData = allMaterials.map((material) => ({
			id: material.id,
			name: material.name,
		}));

		return materialsData;
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return [];
	}
}

async function getMaterial(id) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Materials')) {
			// console.log('Type table does not exist.');
			return null;
		}

		// Retrieve the Type with the specified ID
		const material = await Material.findByPk(id);

		if (!material) {
			// console.log(`Type with ID ${id} not found.`);
			return null;
		}

		// console.log('Type:', Type);
		return material;
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return null;
	}
}

export const apiMaterial = {
	addMaterial,
	getMaterials,
	getMaterial,
};
