import { useQuery } from '@tanstack/react-query';
import { getTypes } from '../../services/apiType';

export function useType() {
	const {
		isLoading,
		data: types,
		error,
	} = useQuery({
		queryKey: ['types'],
		queryFn: getTypes,
	});

	return { isLoading, error, types };
}
