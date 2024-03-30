import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteSize as apiDeleteSize } from '../../services/apiSize';

export function useDeleteSize() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteSize } = useMutation({
		mutationFn: apiDeleteSize,
		onSuccess: () => {
			toast.success('Size successfully deleted');
			queryClient.invalidateQueries({ queryKey: ['sizes'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteSize };
}
