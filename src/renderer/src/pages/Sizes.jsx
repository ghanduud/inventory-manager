import Heading from '../components/Heading';
import Row from '../components/Row';

import AddSize from '../features/size/AddSize';
import SizesTable from '../features/size/SizesTable';

function Sizes() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Sizes</Heading>
			</Row>

			<Row>
				<SizesTable />
				<AddSize />
			</Row>
		</>
	);
}

export default Sizes;
