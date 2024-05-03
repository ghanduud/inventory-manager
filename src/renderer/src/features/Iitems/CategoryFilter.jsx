import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Select from '../../components/Select';
import { useCategory } from '../category/useCategory';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function CategoryFilter() {
	const { isLoading, categories } = useCategory();
	const [searchParams, setSearchParams] = useSearchParams();

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'All' },
		...categories.map((category) => ({ value: category.name, label: category.name })),
	];

	const categoryFilter = searchParams.get('categoryFilter') || '';

	function handleChange(e) {
		searchParams.set('categoryFilter', e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<FilterCell>
			<label>الصنف</label>
			<Select options={options} value={categoryFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default CategoryFilter;
