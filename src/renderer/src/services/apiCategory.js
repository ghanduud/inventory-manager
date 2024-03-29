export async function getCategories() {
	const { data, error } = await window.apiCategory.getCategories();
	if (error) throw new Error(error);
	return data;
}
