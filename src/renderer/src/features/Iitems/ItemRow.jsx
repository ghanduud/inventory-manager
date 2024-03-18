import styled from 'styled-components';

import { TbTransform } from 'react-icons/tb';

import Table from '../../components/Table';
import Menus from '../../components/Menus';
import Modal from '../../components/Modal';
import TransfareItemForm from './TransfareItemForm';

const Cell = styled.div`
	padding: 1.3rem 2.4rem;
	font-family: sans-serif;
	border-left: 1px solid var(--color-grey-200);
	text-align: center;
	font-size: 1.6rem;
	font-weight: 500;
	color: var(--color-grey-700);
`;

const Toggle = styled.div`
	margin-right: 1rem;
`;

function ItemRow({ item }) {
	const {
		id: itemId,
		category,
		material,
		inventoryLocation,
		manufacture,
		numberOfPieces,
		pricePerKilo,
		size,
		type,
		weightPerPiece,
	} = item;

	const totalWeight = numberOfPieces * weightPerPiece;

	console.log(item);

	return (
		<Table.Row>
			<Cell>{category}</Cell>
			<Cell>{material}</Cell>
			<Cell>{type}</Cell>
			<Cell>{size}</Cell>
			<Cell>{manufacture}</Cell>
			<Cell>{pricePerKilo}</Cell>
			<Cell>{weightPerPiece}</Cell>
			<Cell>{numberOfPieces}</Cell>
			<Cell>{totalWeight}</Cell>
			<Cell>{inventoryLocation}</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={itemId} />

						<Menus.List id={itemId}>
							<Modal.Open opens='transfare'>
								<Menus.Button icon={<TbTransform />}>Transefare</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name='transfare'>
							<TransfareItemForm itemToTransefareFrom={item} />
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default ItemRow;
