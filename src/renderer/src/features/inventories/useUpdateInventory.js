import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateInventory as apiUpdateInventory } from '../../services/apiInventory';

export function useUpdateInventory() {
	const queryClient = useQueryClient();

	const { mutate: updateInventory, isLoading: isUpdateing } = useMutation({
		mutationFn: apiUpdateInventory,
		onSuccess: () => {
			toast.success('Inventory successfully updated');
			queryClient.invalidateQueries({ queryKey: ['inventories'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdateing, updateInventory };
}
