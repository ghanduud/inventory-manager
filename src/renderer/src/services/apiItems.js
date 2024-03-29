export async function getItems() {
	const { data, error } = await window.apiItem.getAllItemsWithDetails();
	if (error) throw new Error(error);
	return data;
}

export async function transfareItems({ id, amount, inventoryId }) {
	const { error } = await window.apiItem.transferItems(id, amount, inventoryId);
	if (error) throw new Error(error);
}

export async function deleteItem(id) {
	const { error } = await window.apiItem.deleteItemById(id);
	if (error) throw new Error(error);
}

export async function createItem(newItem) {
	const { error } = await window.apiItem.addItem(newItem);
	if (error) throw new Error(error);
}
