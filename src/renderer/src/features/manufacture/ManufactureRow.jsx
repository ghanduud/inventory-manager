import styled from 'styled-components';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Menus from '../../components/Menus';
import ConfirmDelete from '../../components/ConfirmDelete';
import CreateUpdateManufactureForm from './CreateUpdateManufactureForm';

import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useDeleteManufacture } from './useDeleteManufacture';

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

function ManufactureRow({ manufacture }) {
	const { isDeleting, deleteManufacture } = useDeleteManufacture();

	const { id: manufactureId, name, phoneNumber, email } = manufacture;

	return (
		<Table.Row>
			<Cell>{name}</Cell>
			<Cell>{phoneNumber}</Cell>
			<Cell>{email}</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={manufactureId} />

						<Menus.List id={manufactureId}>
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
							<CreateUpdateManufactureForm manufactureToUpdate={manufacture} />
						</Modal.Window>

						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='Manufacture'
								disabled={isDeleting}
								onConfirm={() => deleteManufacture({ id: manufactureId })}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default ManufactureRow;
