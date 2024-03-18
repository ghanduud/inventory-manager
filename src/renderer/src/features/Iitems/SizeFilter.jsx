import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Select from '../../components/Select';

import { useSize } from '../size/useSize';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function SizeFilter() {
	const { isLoading, sizes } = useSize();
	const [searchParams, setSearchParams] = useSearchParams();

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'All' },
		...sizes.map((size) => ({ value: size.name, label: size.name })),
	];

	const sizeFilter = searchParams.get('sizeFilter') || '';

	function handleChange(e) {
		searchParams.set('sizeFilter', e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<FilterCell>
			<label>Size</label>
			<Select options={options} value={sizeFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default SizeFilter;
