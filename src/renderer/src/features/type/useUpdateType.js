import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateType as apiUpdateType } from '../../services/apiType';

export function useUpdateType() {
	const queryClient = useQueryClient();

	const { mutate: updateType, isLoading: isUpdateing } = useMutation({
		mutationFn: apiUpdateType,
		onSuccess: () => {
			toast.success('Type successfully updated');
			queryClient.invalidateQueries({ queryKey: ['types'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdateing, updateType };
}
