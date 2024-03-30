import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteType as apiDeleteType } from '../../services/apiType';

export function useDeleteType() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteType } = useMutation({
		mutationFn: apiDeleteType,
		onSuccess: () => {
			toast.success('Type successfully deleted');
			queryClient.invalidateQueries({ queryKey: ['types'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteType };
}
