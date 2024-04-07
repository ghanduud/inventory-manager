import styled from 'styled-components';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Menus from '../../components/Menus';
import ConfirmDelete from '../../components/ConfirmDelete';
import CreateUpdateSizeForm from './CreateUpdateSizeForm';

import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useDeleteSize } from './useDeleteSize';

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

function SizeRow({ size }) {
	const { isDeleting, deleteSize } = useDeleteSize();

	const { id: sizeId, name } = size;

	return (
		<Table.Row>
			<Cell>{name}</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={sizeId} />

						<Menus.List id={sizeId}>
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
							<CreateUpdateSizeForm sizeToUpdate={size} />
						</Modal.Window>

						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='Size'
								disabled={isDeleting}
								onConfirm={() => deleteSize({ id: sizeId })}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default SizeRow;
