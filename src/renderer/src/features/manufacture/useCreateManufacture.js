import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createManufacture as apiCreateManufacture } from '../../services/apiManufacture';

export function useCreateManufacture() {
	const queryClient = useQueryClient();

	const { mutate: createManufacture, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateManufacture,
		onSuccess: () => {
			toast.success('New manufacture successfully created');
			queryClient.invalidateQueries({ queryKey: ['manufactures'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createManufacture };
}
