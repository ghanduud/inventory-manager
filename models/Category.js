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
		}

		// Add the provided Category to the table
		await Category.create({
			name: name,
		});

		return { error: null };
		// console.log(`Category ${name} added.`);
	} catch (error) {
		// console.error('Error syncing Category model:', error);
		return { error: `Error in creating category` };
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
			return { data: [], error: null };
		}

		// Retrieve all Categories from the table with only the necessary attributes
		const allCategories = await Category.findAll();

		const categoryData = allCategories.map((category) => ({
			id: category.id,
			name: category.name,
		}));
		// console.log('All Categories in the table:', allCategories);

		return { data: categoryData, error: null };
	} catch (error) {
		// console.error('Error syncing Category model:', error);
		return { data: [], error: `Failed to get category` };
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
			return { data: null, error: `Category does not excist` };
		}

		// Retrieve the Category with the specified ID
		const category = await Category.findByPk(id);

		if (!category) {
			// console.log(`Category with ID ${id} not found.`);
			return { data: null, error: `category does not excist` };
		}

		// console.log('Category:', Category);
		return { data: category, error: null };
	} catch (error) {
		// console.error('Error syncing Category model:', error);
		return { data: null, error: `Failed to get category` };
	}
}

export const apiCategory = {
	addCategory,
	getCategories,
	getCategory,
};
