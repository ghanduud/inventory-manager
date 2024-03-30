import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createMaterial as apiCreateMaterial } from '../../services/apiMaterial';

export function useCreateMaterial() {
	const queryClient = useQueryClient();

	const { mutate: createMaterial, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateMaterial,
		onSuccess: () => {
			toast.success('New material successfully created');
			queryClient.invalidateQueries({ queryKey: ['materials'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createMaterial };
}
