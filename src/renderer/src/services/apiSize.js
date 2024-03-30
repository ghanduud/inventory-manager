export async function getSizes() {
	const { data, error } = await window.apiSize.getSizes();
	if (error) throw new Error(error);
	return data;
}

export async function deleteSize(sizeToDelete) {
	const { error } = await window.apiSize.deleteSize(sizeToDelete);
	if (error) throw new Error(error);
}

export async function createSize(sizeToCreate) {
	const { error } = await window.apiSize.createSize(sizeToCreate);
	if (error) return error;
}

export async function updateSize(sizeToUpdate) {
	const { error } = await window.apiSize.updateSize(sizeToUpdate);
	if (error) throw new Error(error);
}
