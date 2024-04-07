import Heading from '../components/Heading';
import Row from '../components/Row';

import AddManufacture from '../features/manufacture/AddManufacture';
import ManufactureTable from '../features/manufacture/ManufactureTable';

function Manufactures() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Manufactures</Heading>
			</Row>

			<Row>
				<ManufactureTable />
				<AddManufacture />
			</Row>
		</>
	);
}

export default Manufactures;
