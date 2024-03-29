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
		}

		// Add the provided Type to the table
		await Material.create({
			name: name,
		});
		// console.log(`Type ${name} added.`);
		return { error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { error: `Error adding material` };
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
			return { data: [], error: `Material doesn't exist` };
		}

		// Retrieve all Types from the table
		const allMaterials = await Material.findAll();
		// console.log('All Types in the table:', allTypes);

		const materialsData = allMaterials.map((material) => ({
			id: material.id,
			name: material.name,
		}));

		return { data: materialsData, error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { data: [], error: `Error geting material` };
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
			return { data: null, error: `Error getting material` };
		}

		// Retrieve the Type with the specified ID
		const material = await Material.findByPk(id);

		if (!material) {
			// console.log(`Type with ID ${id} not found.`);
			return { data: null, error: `material doesnt exist` };
		}

		// console.log('Type:', Type);
		return { data: material, error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { data: null, error: `Error getting material` };
	}
}

export const apiMaterial = {
	addMaterial,
	getMaterials,
	getMaterial,
};
