export async function getManufactures() {
	const { data, error } = await window.apiManufacture.getManufactures();
	if (error) throw new Error(error);
	return data;
}
