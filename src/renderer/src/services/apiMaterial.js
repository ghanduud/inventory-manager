export async function getMaterials() {
	const { data, error } = await window.apiMaterial.getMaterials();
	if (error) throw new Error(error);
	return data;
}
