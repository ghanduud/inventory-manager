import { useQuery } from '@tanstack/react-query';
import { getInventories } from '../../services/apiInventory';

export function useInventory() {
	const {
		isLoading,
		data: inventories,
		error,
	} = useQuery({
		queryKey: ['inventories'],
		queryFn: getInventories,
	});

	return { isLoading, error, inventories };
}
