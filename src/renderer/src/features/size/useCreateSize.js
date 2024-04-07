import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createSize as apiCreateSize } from '../../services/apiSize';

export function useCreateSize() {
	const queryClient = useQueryClient();

	const { mutate: createSize, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateSize,
		onSuccess: () => {
			toast.success('New size successfully created');
			queryClient.invalidateQueries({ queryKey: ['sizes'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createSize };
}
