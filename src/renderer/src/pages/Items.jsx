import Row from '../components/Row';
import Heading from '../components/Heading';
import ItemTable from '../features/Iitems/ItemTable';

function Items() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Items</Heading>
			</Row>

			<Row>
				<ItemTable />
			</Row>
		</>
	);
}

export default Items;
