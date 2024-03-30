import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateMaterial as apiUpdateMaterial } from '../../services/apiMaterial';

export function useUpdateMaterial() {
	const queryClient = useQueryClient();

	const { mutate: updateMaterial, isLoading: isUpdateing } = useMutation({
		mutationFn: apiUpdateMaterial,
		onSuccess: () => {
			toast.success('Material successfully updated');
			queryClient.invalidateQueries({ queryKey: ['materials'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdateing, updateMaterial };
}
