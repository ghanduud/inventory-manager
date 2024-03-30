export async function getCategories() {
	const { data, error } = await window.apiCategory.getCategories();
	if (error) throw new Error(error);
	return data;
}

export async function deleteCategory(categoryToDelete) {
	const { error } = await window.apiCategory.deleteCategory(categoryToDelete);
	if (error) throw new Error(error);
}

export async function createCategory(categoryToCreate) {
	const { error } = await window.apiCategory.createCategory(categoryToCreate);
	if (error) return error;
}

export async function updateCategory(categoryToUpdate) {
	const { error } = await window.apiCategory.updateCategory(categoryToUpdate);
	if (error) throw new Error(error);
}
