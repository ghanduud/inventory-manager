import { useQuery } from '@tanstack/react-query';
import { getManufactures } from '../../services/apiManufacture';

export function useManufacrure() {
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
