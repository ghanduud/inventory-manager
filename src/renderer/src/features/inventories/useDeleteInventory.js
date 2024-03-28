import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteInventory as apiDeleteInventory } from '../../services/apiInventory';
import toast from 'react-hot-toast';

export function useDeleteInventory() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteInventory } = useMutation({
		mutationFn: apiDeleteInventory,
		onSuccess: () => {
			toast.success('Item successfully deleted');

			queryClient.invalidateQueries({ queryKey: ['inventories'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteInventory };
}
