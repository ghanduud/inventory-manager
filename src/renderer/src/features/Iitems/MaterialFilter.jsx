import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Select from '../../components/Select';

import { useMaterial } from '../material/useMaterial';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function MaterialFilter() {
	const { isLoading, materials } = useMaterial();
	const [searchParams, setSearchParams] = useSearchParams();

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'All' },
		...materials.map((material) => ({ value: material.name, label: material.name })),
	];

	const materialFilter = searchParams.get('materialFilter') || '';

	function handleChange(e) {
		searchParams.set('materialFilter', e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<FilterCell>
			<label>Material</label>
			<Select options={options} value={materialFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default MaterialFilter;
