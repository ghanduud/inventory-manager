import Row from '../components/Row';
import Heading from '../components/Heading';
import ItemTable from '../features/Iitems/ItemTable';
import ItemOperations from '../features/Iitems/ItemOperations';

function Items() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Items</Heading>
				<ItemOperations />
			</Row>

			<Row>
				<ItemTable />
			</Row>
		</>
	);
}

export default Items;
