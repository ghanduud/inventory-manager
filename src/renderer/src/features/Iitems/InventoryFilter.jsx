import styled from 'styled-components';
import { useInventory } from '../inventories/useInventory';
import { useSearchParams } from 'react-router-dom';
import Select from '../../components/Select';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function InventoryFilter() {
	const { isLoading, inventories } = useInventory();
	const [searchParams, setSearchParams] = useSearchParams();

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'All' },
		...inventories.map((inventory) => ({ value: inventory.location, label: inventory.location })),
	];

	const inventoryFilter = searchParams.get('inventoryFilter') || '';

	function handleChange(e) {
		searchParams.set('inventoryFilter', e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<FilterCell>
			<label>Inventory</label>
			<Select options={options} value={inventoryFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default InventoryFilter;
