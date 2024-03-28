export async function getInventories() {
	const data = window.apiInventory.getInventories();

	return data;
}

export async function deleteInventory(id) {
	const message = window.apiInventory.deleteInventory(id);
	return message;
}

export async function createInventory(newInventory) {
	const data = window.apiInventory.addInventory(newInventory);
	return data;
}

export async function updateInventory(updatedInventory) {
	const data = window.apiInventory.updateInventory(updatedInventory);
	return data;
}
