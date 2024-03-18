import { DataTypes } from 'sequelize';
import { sequelize } from './sqlite';
import { Manufacture } from './Manufacture';
import { Category } from './Category';
import { Type } from './Type';
import { Size } from './Size';
import { Inventory } from './Inventory';

export const Item = sequelize.define('Item', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	weightPerPiece: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	pricePerKilo: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	numberOfPieces: {
		type: DataTypes.INTEGER,
	},
});

Item.belongsTo(Manufacture);
Item.belongsTo(Category);
Item.belongsTo(Type);
Item.belongsTo(Size);
Item.belongsTo(Inventory);

async function addItem(
	categoryId,
	typeId,
	sizeId,
	inventoryId,
	manufactureId,
	weightPerPiece,
	pricePerKilo,
	numberOfPieces
) {
	try {
		// Find associated Category, Type, Size, and Inventory records
		const category = await Category.findByPk(categoryId);
		const type = await Type.findByPk(typeId);
		const size = await Size.findByPk(sizeId);
		const inventory = await Inventory.findByPk(inventoryId);
		const manufacture = await Manufacture.findByPk(manufactureId);

		if (!category || !type || !size || !inventory || !manufacture) {
			console.error('Invalid Category, Type, Size, or Inventory ID');
			return null;
		}

		// Calculate the total weight of the items to be added
		const totalWeight = weightPerPiece * numberOfPieces;

		// Check if the destination inventory has enough capacity
		if (inventory.maxCapacity && totalWeight > inventory.maxCapacity) {
			console.error(`Not enough capacity in the inventory for the items.`);
			return null;
		}

		// Check if an item with the same characteristics already exists
		const existingItem = await Item.findOne({
			where: {
				CategoryId: categoryId,
				TypeId: typeId,
				SizeId: sizeId,
				ManufactureId: manufactureId,
				InventoryId: inventoryId,
			},
		});

		if (existingItem) {
			// If the item exists, update the numberOfPieces
			existingItem.numberOfPieces += numberOfPieces;
			await existingItem.save();

			console.log('Item already exists. Number of pieces updated:', existingItem.toJSON());
			return existingItem;
		}

		// Create the Item record with associations
		const newItem = await Item.create({
			weightPerPiece,
			pricePerKilo,
			numberOfPieces,
			CategoryId: categoryId,
			TypeId: typeId,
			SizeId: sizeId,
			ManufactureId: manufactureId,
			InventoryId: inventoryId,
		});

		console.log('Item added:', newItem.toJSON());
		return newItem;
	} catch (error) {
		console.error('Error adding Item:', error);
		return null;
	}
}

async function getAllItemsWithDetails() {
	try {
		// Use Sequelize query with associations and includes
		const items = await Item.findAll({
			include: [
				{
					model: Manufacture,
					attributes: ['name'],
				},
				{
					model: Category,
					attributes: ['name'],
				},
				{
					model: Type,
					attributes: ['name'],
				},
				{
					model: Size,
					attributes: ['name'],
				},
				{
					model: Inventory,
					attributes: ['location'],
				},
			],
		});

		// Extract necessary values from each item
		const itemsWithDetails = items.map((item) => ({
			id: item.id,
			weightPerPiece: item.weightPerPiece,
			pricePerKilo: item.pricePerKilo,
			numberOfPieces: item.numberOfPieces,
			manufacture: item.Manufacture ? item.Manufacture.name : null,
			category: item.Category ? item.Category.name : null,
			type: item.Type ? item.Type.name : null,
			size: item.Size ? item.Size.name : null,
			inventoryLocation: item.Inventory ? item.Inventory.location : null,
		}));

		return itemsWithDetails;
	} catch (error) {
		console.error('Error getting items with details:', error);
		return null;
	}
}

async function getItemWithDetailsById(itemId) {
	try {
		// Use Sequelize query with associations and includes
		const item = await Item.findByPk(itemId, {
			include: [
				{
					model: Manufacture,
					attributes: ['name'],
				},
				{
					model: Category,
					attributes: ['name'],
				},
				{
					model: Type,
					attributes: ['name'],
				},
				{
					model: Size,
					attributes: ['name'],
				},
				{
					model: Inventory,
					attributes: ['location'],
				},
			],
		});

		if (item) {
			console.log(`Item with ID ${itemId} and details:`, item.toJSON());
		} else {
			console.log(`Item with ID ${itemId} not found.`);
		}

		return item;
	} catch (error) {
		console.error(`Error getting item with ID ${itemId} and details:`, error);
		return null;
	}
}

async function transferItems(itemId, numberOfPieces, destinationInventoryId) {
	try {
		// Find the item to be transferred
		const itemToTransfer = await Item.findByPk(itemId, {
			include: [Manufacture, Category, Type, Size, Inventory],
		});

		if (!itemToTransfer) {
			console.error(`Item with ID ${itemId} not found.`);
			return null;
		}

		// Check if the destination inventory exists
		const destinationInventory = await Inventory.findByPk(destinationInventoryId);

		if (!destinationInventory) {
			console.error(`Inventory with ID ${destinationInventoryId} not found.`);
			return null;
		}

		// Calculate the total weight of the items to be transferred
		const totalWeight = itemToTransfer.weightPerPiece * numberOfPieces;

		// Check if the destination inventory has enough capacity
		if (destinationInventory.maxCapacity && totalWeight > destinationInventory.maxCapacity) {
			console.error(`Not enough capacity in the destination inventory for the items.`);
			return null;
		}

		// Find or create the destination item
		const [destinationItem] = await Item.findOrCreate({
			where: {
				CategoryId: itemToTransfer.CategoryId,
				TypeId: itemToTransfer.TypeId,
				SizeId: itemToTransfer.SizeId,
				ManufactureId: itemToTransfer.ManufactureId,
				InventoryId: destinationInventoryId,
			},
			defaults: {
				weightPerPiece: itemToTransfer.weightPerPiece,
				pricePerKilo: itemToTransfer.pricePerKilo,
				numberOfPieces: 0,
			},
		});

		// Check if there's enough quantity to transfer
		if (itemToTransfer.numberOfPieces < numberOfPieces) {
			console.error(`Not enough pieces to transfer for item with ID ${itemId}.`);
			return null;
		}

		// Update the destination item
		destinationItem.numberOfPieces += numberOfPieces;
		await destinationItem.save();

		// Update the source item
		itemToTransfer.numberOfPieces -= numberOfPieces;

		// If the source item's numberOfPieces is zero, delete the item
		if (itemToTransfer.numberOfPieces === 0) {
			await itemToTransfer.destroy();
			console.log(`Item ${itemId} deleted.`);
		} else {
			await itemToTransfer.save();
		}

		return destinationItem;
	} catch (error) {
		console.error('Error transferring items:', error);
		return null;
	}
}

export const apiItem = {
	addItem,
	getAllItemsWithDetails,
	getItemWithDetailsById,
	transferItems,
};
