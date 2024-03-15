import Menus from '../../components/Menus';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import Empty from '../../components/Empty';

import { useItems } from './useItems';
import ItemRow from './ItemRow';

function ItemTable() {
	const { isLoading, items } = useItems();

	if (isLoading) return <Spinner />;
	if (!items.length) return <Empty resourceName='Items' />;

	return (
		<Menus>
			<Table columns='0.8fr 0.8fr .5fr 1fr .8fr .8fr 1fr 0.8fr 0.1fr'>
				<Table.Header>
					<div>Category</div>
					<div>Type</div>
					<div>Size</div>
					<div>Manufacture</div>
					<div>Price per kilo</div>
					<div>Weight per piece</div>
					<div>Number of Pieces</div>
					<div>Inventory</div>
					<div></div>
				</Table.Header>

				<Table.Body data={items} render={(item) => <ItemRow item={item} key={item.id} />} />
			</Table>
		</Menus>
	);
}

export default ItemTable;
