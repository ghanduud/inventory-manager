import { useQuery } from '@tanstack/react-query';
import { getSizes } from '../../services/apiSize';

export function useSize() {
	const {
		isLoading,
		data: sizes,
		error,
	} = useQuery({
		queryKey: ['sizes'],
		queryFn: getSizes,
	});

	return { isLoading, error, sizes };
}
