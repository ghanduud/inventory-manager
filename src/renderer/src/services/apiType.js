export async function getTypes() {
	const { data, error } = await window.apiType.getTypes();
	if (error) throw new Error(error);
	return data;
}

export async function deleteType(typeToDelete) {
	const { error } = await window.apiType.deleteType(typeToDelete);
	if (error) throw new Error(error);
}

export async function createType(typeToCreate) {
	const { error } = await window.apiType.createType(typeToCreate);
	if (error) return error;
}

export async function updateType(typeToUpdate) {
	const { error } = await window.apiType.updateType(typeToUpdate);
	if (error) throw new Error(error);
}
