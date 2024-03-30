import { Item, sequelize, Manufacture, Category, Type, Size, Inventory, Material } from './sqlite';

async function addItem({
	categoryId,
	typeId,
	sizeId,
	inventoryId,
	manufactureId,
	materialId,
	weightPerPiece,
	pricePerKilo,
	numberOfPieces,
}) {
	const numberOfItems = Number(numberOfPieces);
	const weightOfItem = Number(weightPerPiece);
	try {
		await sequelize.sync();
		// Find associated Category, Type, Size, and Inventory records
		const category = await Category.findByPk(categoryId);
		const type = await Type.findByPk(typeId);
		const size = await Size.findByPk(sizeId);
		const inventory = await Inventory.findByPk(inventoryId);
		const manufacture = await Manufacture.findByPk(manufactureId);
		const material = await Material.findByPk(materialId);

		if (!category || !type || !size || !inventory || !manufacture || !material) {
			// console.error('Invalid Category, Type, Size, or Inventory ID');
			return { error: 'Invalid data' };
		}

		// Calculate the total weight of the new items
		const totalWeight = weightOfItem * numberOfItems;

		// Check if adding the new items will exceed the maxCapacity of the inventory
		if (inventory.currentCapacity + totalWeight > inventory.maxCapacity) {
			return { error: `Adding the new items will exceed the maxCapacity of the inventory` };
		}

		// Check if an item with the same characteristics already exists
		const existingItem = await Item.findOne({
			where: {
				CategoryId: categoryId,
				TypeId: typeId,
				SizeId: sizeId,
				ManufactureId: manufactureId,
				InventoryId: inventoryId,
				MaterialId: materialId,
			},
		});

		if (existingItem) {
			// If the item exists, update the numberOfPieces
			existingItem.numberOfPieces += numberOfItems;
			await existingItem.save();

			// Update the currentCapacity of the inventory
			inventory.currentCapacity += totalWeight;
			await inventory.save();

			return { error: null };
		}

		// Create the Item record with associations
		await Item.create({
			weightPerPiece: weightOfItem,
			pricePerKilo,
			numberOfPieces: numberOfItems,
			CategoryId: categoryId,
			TypeId: typeId,
			SizeId: sizeId,
			ManufactureId: manufactureId,
			InventoryId: inventoryId,
			MaterialId: materialId,
		});

		// Update the currentCapacity of the inventory
		inventory.currentCapacity += totalWeight;
		await inventory.save();

		return { error: null };
	} catch (error) {
		return { error: `Error adding Item` };
	}
}

async function getAllItemsWithDetails() {
	try {
		await sequelize.sync();
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
				{
					model: Material,
					attributes: ['name'],
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
			material: item.Material ? item.Material.name : null,
		}));

		return { data: itemsWithDetails, error: null };
	} catch (error) {
		return { data: [], error: `Error getting items` };
	}
}

async function getItemWithDetailsById(itemId) {
	try {
		await sequelize.sync();
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
				{
					model: Material,
					attributes: ['name'],
				},
			],
		});

		return { data: item, error: null };
	} catch (error) {
		// console.error(`Error getting item with ID ${itemId} and details:`, error);
		return { data: null, error: `Error getting item` };
	}
}

async function transferItems(itemId, numberOfPieces, destinationInventoryId) {
	const numberOfItems = Number(numberOfPieces);

	try {
		await sequelize.sync();
		// Find the item to be transferred
		const itemToTransfer = await Item.findByPk(itemId, {
			include: [Manufacture, Category, Type, Size, Inventory],
		});

		if (!itemToTransfer) {
			return { error: `Item not found` };
		}

		// Check if the destination inventory exists
		const destinationInventory = await Inventory.findByPk(destinationInventoryId);

		if (!destinationInventory) {
			return { error: `Inventory not found` };
		}

		// Calculate the total weight of the items to be transferred
		const totalWeight = itemToTransfer.weightPerPiece * numberOfItems;

		// Check if the destination inventory has enough capacity
		if (destinationInventory.maxCapacity && totalWeight > destinationInventory.maxCapacity) {
			return { error: `No Enough capacity in the distenation inventory` };
		}

		// Find or create the destination item
		const [destinationItem] = await Item.findOrCreate({
			where: {
				CategoryId: itemToTransfer.CategoryId,
				TypeId: itemToTransfer.TypeId,
				SizeId: itemToTransfer.SizeId,
				ManufactureId: itemToTransfer.ManufactureId,
				MaterialId: itemToTransfer.ManufactureId,
				InventoryId: destinationInventoryId,
			},
			defaults: {
				weightPerPiece: itemToTransfer.weightPerPiece,
				pricePerKilo: itemToTransfer.pricePerKilo,
				numberOfPieces: 0,
			},
		});

		// Check if there's enough quantity to transfer
		if (itemToTransfer.numberOfPieces < numberOfItems) {
			return { error: `No enough picese to transefare to ` };
		}

		// Update the destination item
		destinationItem.numberOfPieces += numberOfItems;
		await destinationItem.save();

		// Update the source item
		itemToTransfer.numberOfPieces -= numberOfItems;

		// If the source item's numberOfPieces is zero, delete the item
		if (itemToTransfer.numberOfPieces === 0) {
			await itemToTransfer.destroy();
		} else {
			await itemToTransfer.save();
		}

		// Update currentCapacity of the destination inventory
		destinationInventory.currentCapacity += totalWeight;
		await destinationInventory.save();

		// Update currentCapacity of the source inventory
		const sourceInventory = await Inventory.findByPk(itemToTransfer.InventoryId);
		sourceInventory.currentCapacity -= totalWeight;
		await sourceInventory.save();

		return { error: null };
	} catch (error) {
		return { error: `Error transfearing the item` };
	}
}

async function deleteItemById(itemId) {
	try {
		await sequelize.sync();
		// Find the item by its ID
		const item = await Item.findByPk(itemId);

		if (!item) {
			return { error: `Item not found` };
		}

		// Get the associated inventory ID and weight per piece
		const { InventoryId, weightPerPiece } = item;

		// Calculate the total weight of the item
		const totalWeight = weightPerPiece * item.numberOfPieces;

		// Retrieve the corresponding inventory record
		const inventory = await Inventory.findByPk(InventoryId);

		if (!inventory) {
			console.error(`Inventory with ID ${InventoryId} not found.`);
			return { error: `Inventory not found` };
		}

		// Update the current capacity of the inventory
		inventory.currentCapacity -= totalWeight;
		await inventory.save();

		// Delete the item
		await item.destroy();

		return { error: null };
	} catch (error) {
		console.error(`Error deleting item with ID ${itemId}:`, error);
		return { error: `Error deleting the item` };
	}
}

export const apiItem = {
	addItem,
	getAllItemsWithDetails,
	getItemWithDetailsById,
	transferItems,
	deleteItemById,
};
