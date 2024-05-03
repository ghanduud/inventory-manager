import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Select from '../../components/Select';

import { useType } from '../type/useType';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function TypeFilter() {
	const { isLoading, types } = useType();
	const [searchParams, setSearchParams] = useSearchParams();

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'All' },
		...types.map((type) => ({ value: type.name, label: type.name })),
	];

	const typeFilter = searchParams.get('typeFilter') || '';

	function handleChange(e) {
		searchParams.set('typeFilter', e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<FilterCell>
			<label>النوع</label>
			<Select options={options} value={typeFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default TypeFilter;
