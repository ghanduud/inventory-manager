import styled from 'styled-components';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Menus from '../../components/Menus';
import ConfirmDelete from '../../components/ConfirmDelete';

import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useDeleteInventory } from './useDeleteInventory';
import CreateUpdateInventoryForm from './CreateUpdateInventoryForm';

const Cell = styled.div`
	padding: 1.3rem 2.4rem;
	font-family: sans-serif;
	border-left: 1px solid var(--color-grey-200);
	text-align: center;
	font-size: 2rem;
	font-weight: 500;
	color: var(--color-grey-700);
`;

const Toggle = styled.div`
	margin-right: 1rem;
`;

function InventoryRow({ inventory }) {
	const { isDeleting, deleteInventory } = useDeleteInventory();

	const { id: inventoryId, location, maxCapacity, currentCapacity } = inventory;

	const percent = (currentCapacity * 100) / maxCapacity;

	return (
		<Table.Row>
			<Cell>{location}</Cell>
			<Cell>{currentCapacity}</Cell>
			<Cell>{maxCapacity}</Cell>
			<Cell>{percent}%</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={inventoryId} />

						<Menus.List id={inventoryId}>
							<Modal.Open opens='Update'>
								<Menus.Button icon={<HiPencil />}>Update</Menus.Button>
							</Modal.Open>
							<Modal.Open opens='delete'>
								<Menus.Button menutype='delete' icon={<HiTrash />}>
									Delete
								</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name='Update'>
							<CreateUpdateInventoryForm inventoryToUpdate={inventory} />
						</Modal.Window>

						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='inventory'
								disabled={isDeleting}
								onConfirm={() => deleteInventory({ id: inventoryId })}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default InventoryRow;
