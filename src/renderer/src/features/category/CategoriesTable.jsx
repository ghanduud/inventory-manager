import Empty from '../../components/Empty';
import Menus from '../../components/Menus';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import CategoryRow from './CategoryRow';

import { useCategory } from './useCategory';

function CategoriesTable() {
	const { isLoading, categories } = useCategory();

	if (isLoading) return <Spinner />;
	if (!categories?.length) return <Empty resourceName='Categories' />;

	return (
		<Menus>
			<Table columns='1fr 0.1fr'>
				<Table.Header>
					<div>الاسم</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={categories}
					render={(category) => <CategoryRow category={category} key={category.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CategoriesTable;
