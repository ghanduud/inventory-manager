export async function getItems() {
	const { data, error } = await window.apiItem.getAllItemsWithDetails();
	if (error) throw new Error(error);
	return data;
}

export async function transfareItems(ItemsToTransfare) {
	const { error } = await window.apiItem.transferItems(ItemsToTransfare);
	if (error) throw new Error(error);
}

export async function deleteItem(itemToDelete) {
	const { error } = await window.apiItem.deleteItemById(itemToDelete);
	if (error) throw new Error(error);
}

export async function createItem(newItem) {
	const { error } = await window.apiItem.createItem(newItem);
	if (error) throw new Error(error);
}

export async function updatePrice(itemToUpdate) {
	const { error } = await window.apiItem.updatePrice(itemToUpdate);
	if (error) throw new Error(error);
}
