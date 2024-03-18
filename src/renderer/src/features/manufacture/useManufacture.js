import { useQuery } from '@tanstack/react-query';
import { getManufactures } from '../../services/apiManufacture';

export function useManufacture() {
	const {
		isLoading,
		data: manufactures,
		error,
	} = useQuery({
		queryKey: ['manufactures'],
		queryFn: getManufactures,
	});

	return { isLoading, error, manufactures };
}
