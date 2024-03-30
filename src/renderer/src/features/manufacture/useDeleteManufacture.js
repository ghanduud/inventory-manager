import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteManufacture as apiDeleteManufacture } from "../../services/apiManufacture";

export function useDeleteManufacture() {
    const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteManufacture } = useMutation({
		mutationFn: apiDeleteManufacture,
		onSuccess: () => {
			toast.success('Manufacture successfully deleted');

			queryClient.invalidateQueries({ queryKey: ['manufactures'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteManufacture };
}
