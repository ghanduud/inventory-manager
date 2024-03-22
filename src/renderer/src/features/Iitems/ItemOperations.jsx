import TableOperations from '../../components/TableOperations';
import CategoryFilter from './CategoryFilter';
import InventoryFilter from './InventoryFilter';
import ManufactureFilter from './ManufactureFilter';
import MaterialFilter from './MaterialFilter';
import SizeFilter from './SizeFilter';
import TypeFilter from './TypeFilter';

function ItemOperations() {
	return (
		<TableOperations>
			<CategoryFilter />
			<MaterialFilter />
			<TypeFilter />
			<SizeFilter />
			<ManufactureFilter />
			<InventoryFilter />
		</TableOperations>
	);
}

export default ItemOperations;
