export async function getItems() {
	const data = window.apiItem.getAllItemsWithDetails();
	return data;
}

export async function transfareItems({ id, amount, inventoryId }) {
	const data = window.apiItem.transferItems(id, amount, inventoryId);
	return data;
}
