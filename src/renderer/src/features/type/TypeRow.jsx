import styled from 'styled-components';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Menus from '../../components/Menus';
import ConfirmDelete from '../../components/ConfirmDelete';
import CreateUpdateTypeForm from './CreateUpdateTypeForm';

import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useDeleteType } from './useDeleteType';

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

function TypeRow({ type }) {
	const { isDeleting, deleteType } = useDeleteType();

	const { id: typeId, name } = type;

	return (
		<Table.Row>
			<Cell>{name}</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={typeId} />

						<Menus.List id={typeId}>
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
							<CreateUpdateTypeForm typeToUpdate={type} />
						</Modal.Window>

						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='Type'
								disabled={isDeleting}
								onConfirm={() => deleteType({ id: typeId })}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default TypeRow;
