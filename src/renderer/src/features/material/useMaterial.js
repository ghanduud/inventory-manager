import { useQuery } from '@tanstack/react-query';
import { getMaterials } from '../../services/apiMaterial';

export function useMaterial() {
	const {
		isLoading,
		data: materials,
		error,
	} = useQuery({
		queryKey: ['materials'],
		queryFn: getMaterials,
	});

	return { isLoading, error, materials };
}
