export async function getCategories() {
	const data = window.apiCategory.getCategories();
	return data;
}
