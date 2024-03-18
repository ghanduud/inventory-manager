import TableOperations from '../../components/TableOperations';
import CategoryFilter from './CategoryFilter';
import InventoryFilter from './InventoryFilter';
import ManufactureFilter from './ManufactureFilter';
import SizeFilter from './SizeFilter';
import TypeFilter from './TypeFilter';

function ItemOperations() {
	return (
		<TableOperations>
			<CategoryFilter />
			<TypeFilter />
			<SizeFilter />
			<ManufactureFilter />
			<InventoryFilter />
		</TableOperations>
	);
}

export default ItemOperations;
