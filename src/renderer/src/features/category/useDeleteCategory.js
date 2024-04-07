import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// import { deleteManufacture as apiDeleteManufacture } from "../../services/apiManufacture";
import { deleteCategory as apiDeleteCategory } from '../../services/apiCategory';

export function useDeleteCategory() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCategory } = useMutation({
		mutationFn: apiDeleteCategory,
		onSuccess: () => {
			toast.success('Category successfully deleted');

			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCategory };
}
