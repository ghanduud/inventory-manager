import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Select from '../../components/Select';

import { useManufacture } from '../manufacture/useManufacture';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function ManufactureFilter() {
	const { isLoading, manufactures } = useManufacture();
	const [searchParams, setSearchParams] = useSearchParams();

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'All' },
		...manufactures.map((manufacture) => ({ value: manufacture.name, label: manufacture.name })),
	];

	const manufactureFilter = searchParams.get('manufactureFilter') || '';

	function handleChange(e) {
		searchParams.set('manufactureFilter', e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<FilterCell>
			<label>Manufacture</label>
			<Select options={options} value={manufactureFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default ManufactureFilter;
