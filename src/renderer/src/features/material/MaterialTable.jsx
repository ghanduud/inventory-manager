import Empty from '../../components/Empty';
import Menus from '../../components/Menus';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import MaterialRow from './MaterialRow';

import { useMaterial } from './useMaterial';

function MaterialTable() {
	const { isLoading, materials } = useMaterial();

	if (isLoading) return <Spinner />;
	if (!materials?.length) return <Empty resourceName='Materials' />;

	return (
		<Menus>
			<Table columns='1fr 0.1fr'>
				<Table.Header>
					<div>Name</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={materials}
					render={(material) => <MaterialRow material={material} key={material.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default MaterialTable;
