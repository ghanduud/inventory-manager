import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createCategory as apiCreateCategory } from '../../services/apiCategory';

export function useCreateCategory() {
	const queryClient = useQueryClient();

	const { mutate: createCategory, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateCategory,
		onSuccess: () => {
			toast.success('New category successfully created');
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createCategory };
}
