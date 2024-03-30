import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createType as apiCreateType } from '../../services/apiType';

export function useCreateType() {
	const queryClient = useQueryClient();

	const { mutate: createType, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateType,
		onSuccess: () => {
			toast.success('New type successfully created');
			queryClient.invalidateQueries({ queryKey: ['types'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createType };
}
