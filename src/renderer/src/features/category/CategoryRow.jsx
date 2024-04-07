import styled from 'styled-components';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Menus from '../../components/Menus';
import ConfirmDelete from '../../components/ConfirmDelete';
import CreateUpdateCategoryForm from './CreateUpdateCategoryForm';

import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useDeleteCategory } from './useDeleteCategory';

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

function CategoryRow({ category }) {
	const { isDeleting, deleteCategory } = useDeleteCategory();

	const { id: categoryId, name } = category;

	return (
		<Table.Row>
			<Cell>{name}</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={categoryId} />

						<Menus.List id={categoryId}>
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
							<CreateUpdateCategoryForm categoryToUpdate={category} />
						</Modal.Window>

						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='Category'
								disabled={isDeleting}
								onConfirm={() => deleteCategory({ id: categoryId })}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default CategoryRow;
