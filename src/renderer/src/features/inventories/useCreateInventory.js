import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createInventory as apiCreateInventory } from '../../services/apiInventory';

export function useCreateInventory() {
	const queryClient = useQueryClient();

	const { mutate: createInventory, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateInventory,
		onSuccess: () => {
			toast.success('New inventory successfully created');
			queryClient.invalidateQueries({ queryKey: ['inventories'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createInventory };
}
