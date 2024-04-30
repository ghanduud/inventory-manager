import { sequelize, Category, Item } from './sqlite';

async function createCategory({ name }) {
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

async function getCategory({ id }) {
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

async function deleteCategory({ id }) {
	try {
		await sequelize.sync();
		// Check if there are any items associated with the given category ID
		const itemsWithCategory = await Item.findOne({
			where: {
				CategoryId: id,
			},
		});

		if (itemsWithCategory) return { error: 'There are items with this category in the inventory' };

		// If there are no items associated, proceed with deleting the category
		await Category.destroy({
			where: {
				id: id,
			},
		});

		return { error: null };
	} catch (error) {
		console.error('Error deleting category:', error);
		return { error: 'Error deleting category.' };
	}
}

async function updateCategory({ id, name }) {
	try {
		await sequelize.sync();

		const categoryToUpdate = await Category.findByPk(id);

		if (!categoryToUpdate) return { error: `Can not find category to update` };

		categoryToUpdate.name = name;

		await categoryToUpdate.save();

		return { error: null };
	} catch (error) {
		return { error: `Category failed to update` };
	}
}

export const apiCategory = {
	createCategory,
	getCategories,
	getCategory,
	deleteCategory,
	updateCategory,
};
