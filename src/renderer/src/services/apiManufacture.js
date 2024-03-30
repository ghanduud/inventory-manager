export async function getManufactures() {
	const { data, error } = await window.apiManufacture.getManufactures();
	if (error) throw new Error(error);
	return data;
}

export async function deleteManufacture(manufactureToDelete) {
	const { error } = await window.apiManufacture.deleteManufacture(manufactureToDelete);
	if (error) throw new Error(error);
}

export async function createManufacture(manufactureToCreate) {
	const { error } = await window.apiManufacture.createManufacture(manufactureToCreate);
	if (error) return error;
}

export async function updateManufacture(manufactureToUpdate) {
	const { error } = await window.apiManufacture.updateManufacture(manufactureToUpdate);
	if (error) throw new Error(error);
}
