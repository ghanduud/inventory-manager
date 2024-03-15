import { useQuery } from '@tanstack/react-query';
import { getItems } from '../../services/apiItems';

export function useItems() {
	const {
		isLoading,
		data: items,
		error,
	} = useQuery({
		queryKey: ['items'],
		queryFn: getItems,
	});

	return { isLoading, error, items };
}
