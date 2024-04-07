import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updatePrice as apiUpdatePrice } from '../../services/apiItems';

export function useUpdatePrice() {
	const queryClient = useQueryClient();

	const { mutate: updatePrice, isLoading: isUpdateing } = useMutation({
		mutationFn: apiUpdatePrice,
		onSuccess: () => {
			toast.success('Price successfully updated');
			queryClient.invalidateQueries({ queryKey: ['items'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdateing, updatePrice };
}
