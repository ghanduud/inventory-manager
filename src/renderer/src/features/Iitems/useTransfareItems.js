import { useMutation, useQueryClient } from '@tanstack/react-query';

import { transfareItems as apiTransefareItems } from '../../services/apiItems';
import toast from 'react-hot-toast';

export function useTransfareItems() {
	const queryClient = useQueryClient();

	const { mutate: transfareItems, isLoading: isTransfering } = useMutation({
		mutationFn: apiTransefareItems,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['items'] });
		},
		onError: (err) => console.log(err),
	});

	return { transfareItems, isTransfering };
}
