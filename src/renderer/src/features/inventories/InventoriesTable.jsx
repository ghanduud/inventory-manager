import Empty from '../../components/Empty';
import Menus from '../../components/Menus';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import InventoryRow from './InventoryRow';
import { useInventory } from './useInventory';

function InventoriesTable() {
	const { isLoading, inventories } = useInventory();

	if (isLoading) return <Spinner />;
	if (!inventories?.length) return <Empty resourceName='Inventories' />;

	return (
		<Menus>
			<Table columns='1fr 0.8fr 0.8fr 0.8fr 0.1fr'>
				<Table.Header>
					<div>Location</div>
					<div>Current Capacity</div>
					<div>Max Capacity</div>
					<div>Percent</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={inventories}
					render={(inventory) => <InventoryRow inventory={inventory} key={inventory.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default InventoriesTable;
