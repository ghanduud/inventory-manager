import Heading from '../components/Heading';
import Row from '../components/Row';

import AddMaterial from '../features/material/AddMaterial';
import MaterialTable from '../features/material/MaterialTable';

function Materials() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Materials</Heading>
			</Row>

			<Row>
				<MaterialTable />
				<AddMaterial />
			</Row>
		</>
	);
}

export default Materials;
