export async function getMaterials() {
	const { data, error } = await window.apiMaterial.getMaterials();
	if (error) throw new Error(error);
	return data;
}

export async function deleteMaterial(materialToDelete) {
	const { error } = await window.apiMaterial.deleteMaterial(materialToDelete);
	if (error) throw new Error(error);
}

export async function createMaterial(materialToCreate) {
	const { error } = await window.apiMaterial.createMaterial(materialToCreate);
	if (error) return error;
}

export async function updateMaterial(materialToUpdate) {
	const { error } = await window.apiMaterial.updateMaterial(materialToUpdate);
	if (error) throw new Error(error);
}
