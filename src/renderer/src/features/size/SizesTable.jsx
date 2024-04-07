import Empty from '../../components/Empty';
import Menus from '../../components/Menus';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import SizeRow from './SizeRow';

import { useSize } from './useSize';

function SizesTable() {
	const { isLoading, sizes } = useSize();

	if (isLoading) return <Spinner />;
	if (!sizes?.length) return <Empty resourceName='Sizes' />;

	return (
		<Menus>
			<Table columns='1fr 0.1fr'>
				<Table.Header>
					<div>Name</div>
					<div></div>
				</Table.Header>

				<Table.Body data={sizes} render={(size) => <SizeRow size={size} key={size.id} />} />
			</Table>
		</Menus>
	);
}

export default SizesTable;
