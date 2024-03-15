export async function getInventories() {
	const data = window.apiInventory.getInventories();

	return data;
}
