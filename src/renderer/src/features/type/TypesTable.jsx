import Empty from '../../components/Empty';
import Menus from '../../components/Menus';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import TypeRow from './TypeRow';

import { useType } from './useType';

function TypesTable() {
	const { isLoading, types } = useType();

	if (isLoading) return <Spinner />;
	if (!types?.length) return <Empty resourceName='Types' />;

	return (
		<Menus>
			<Table columns='1fr 0.1fr'>
				<Table.Header>
					<div>الاسم</div>
					<div></div>
				</Table.Header>

				<Table.Body data={types} render={(type) => <TypeRow type={type} key={type.id} />} />
			</Table>
		</Menus>
	);
}

export default TypesTable;
