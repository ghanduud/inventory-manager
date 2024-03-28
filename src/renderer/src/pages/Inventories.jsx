import Heading from '../components/Heading';
import Row from '../components/Row';
import AddInvetory from '../features/inventories/AddInventory';
import InventoriesTable from '../features/inventories/InventoriesTable';

function Inventories() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Inventories</Heading>
			</Row>

			<Row>
				<InventoriesTable />
				<AddInvetory />
			</Row>
		</>
	);
}

export default Inventories;
