import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createItem as apiCreateItem } from '../../services/apiItems';

export function useCreateItem() {
	const queryClient = useQueryClient();

	const { mutate: createItem, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateItem,
		onSuccess: () => {
			toast.success('New item successfully created');
			queryClient.invalidateQueries({ queryKey: ['items'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createItem };
}
