export async function getTypes() {
	const { data, error } = await window.apiType.getTypes();
	if (error) throw new Error(error);
	return data;
}
