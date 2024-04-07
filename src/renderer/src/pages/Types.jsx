import Heading from '../components/Heading';
import Row from '../components/Row';

import AddType from '../features/type/AddType';
import TypesTable from '../features/type/TypesTable';

function Types() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Types</Heading>
			</Row>

			<Row>
				<TypesTable />
				<AddType />
			</Row>
		</>
	);
}

export default Types;
