import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSize as apiUpdateSize } from '../../services/apiSize';

export function useUpdateSize() {
	const queryClient = useQueryClient();

	const { mutate: updateSize, isLoading: isUpdateing } = useMutation({
		mutationFn: apiUpdateSize,
		onSuccess: () => {
			toast.success('Size successfully updated');
			queryClient.invalidateQueries({ queryKey: ['sizes'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdateing, updateSize };
}
