import Empty from '../../components/Empty';
import Menus from '../../components/Menus';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import ManufactureRow from './ManufactureRow';

import { useManufacture } from './useManufacture';

function ManufactureTable() {
	const { isLoading, manufactures } = useManufacture();

	if (isLoading) return <Spinner />;
	if (!manufactures?.length) return <Empty resourceName='Manufactures' />;

	return (
		<Menus>
			<Table columns='1fr 0.8fr 0.8fr 0.1fr'>
				<Table.Header>
					<div>Name</div>
					<div>Phone Number</div>
					<div>Email</div>

					<div></div>
				</Table.Header>

				<Table.Body
					data={manufactures}
					render={(manufacture) => <ManufactureRow manufacture={manufacture} key={manufacture.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default ManufactureTable;
