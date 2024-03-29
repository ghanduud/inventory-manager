export async function getSizes() {
	const { data, error } = await window.apiSize.getSizes();
	if (error) throw new Error(error);
	return data;
}
