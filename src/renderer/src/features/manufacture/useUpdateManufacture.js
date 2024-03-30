import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateManufacture as apiUpdateManufacture } from '../../services/apiManufacture';

export function useUpdateManufacture() {
	const queryClient = useQueryClient();

	const { mutate: updateManufacture, isLoading: isUpdateing } = useMutation({
		mutationFn: apiUpdateManufacture,
		onSuccess: () => {
			toast.success('Manufacture successfully updated');
			queryClient.invalidateQueries({ queryKey: ['manufactures'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdateing, updateManufacture };
}
