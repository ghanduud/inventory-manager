import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// import { updateMaterial as apiUpdateMaterial } from '../../services/apiMaterial';
import { updateCategory as apiUpdateCategory } from '../../services/apiCategory';

export function useUpdateCategory() {
	const queryClient = useQueryClient();

	const { mutate: updateCategory, isLoading: isUpdateing } = useMutation({
		mutationFn: apiUpdateCategory,
		onSuccess: () => {
			toast.success('Category successfully updated');
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdateing, updateCategory };
}
