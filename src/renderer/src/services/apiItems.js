export async function getItems() {
	const data = window.apiItem.getAllItemsWithDetails();
	return data;
}

export async function transfareItems({ id, amount, inventoryId }) {
	const data = window.apiItem.transferItems(id, amount, inventoryId);
	return data;
}

export async function deleteItem(id) {
	const message = window.apiItem.deleteItemById(id);
	return message;
}

export async function createItem(newItem) {
	const data = window.apiItem.addItem(newItem);
	return data;
}
