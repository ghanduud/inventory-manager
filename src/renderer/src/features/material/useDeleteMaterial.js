import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteMaterial as apiDeleteMaterial } from '../../services/apiMaterial';

export function useDeleteMaterial() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteMaterial } = useMutation({
		mutationFn: apiDeleteMaterial,
		onSuccess: () => {
			toast.success('Material successfully deleted');
			queryClient.invalidateQueries({ queryKey: ['materials'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteMaterial };
}
