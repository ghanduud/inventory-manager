import { DataTypes } from 'sequelize';
import { sequelize } from './sqlite';

export const Category = sequelize.define('Category', {
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

async function addCategory(name) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Category table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Categories')) {
			// If the table doesn't exist, create it
			await Category.sync();
			// console.log('Category table created.');
		} else {
			// console.log('Category table already exists.');
		}

		// Add the provided Category to the table
		await Category.create({
			name: name,
		});
		// console.log(`Category ${name} added.`);
	} catch (error) {
		// console.error('Error syncing Category model:', error);
	}
}

async function getCategories() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Category table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Categories')) {
			// console.log('Category table does not exist.');
			return [];
		}

		// Retrieve all Categorys from the table
		const allCategories = await Category.findAll();
		// console.log('All Categorys in the table:', allCategorys);

		return allCategories;
	} catch (error) {
		// console.error('Error syncing Category model:', error);
		return [];
	}
}

async function getCategory(id) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Category table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Categories')) {
			// console.log('Category table does not exist.');
			return null;
		}

		// Retrieve the Category with the specified ID
		const Category = await Category.findByPk(id);

		if (!Category) {
			// console.log(`Category with ID ${id} not found.`);
			return null;
		}

		// console.log('Category:', Category);
		return Category;
	} catch (error) {
		// console.error('Error syncing Category model:', error);
		return null;
	}
}

export const apiCategory = {
	addCategory,
	getCategories,
	getCategory,
};