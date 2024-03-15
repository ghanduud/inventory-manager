import { useForm } from 'react-hook-form';
import { useInventory } from '../inventories/useInventory';
import { useState } from 'react';

import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { useTransfareItems } from './useTransfareItems';
import toast from 'react-hot-toast';

function TransfareItemForm({ itemToTransefareFrom, onCloseModal }) {
	const { transfareItems, isTransfering } = useTransfareItems();

	const { isLoading, inventories } = useInventory();
	const { register, handleSubmit, reset, formState } = useForm();
	const { errors } = formState;

	const [selectedInventory, setSelectedInventory] = useState(inventories?.at(0).id || '');

	// State to store the selected inventory ID
	function onSubmit(data) {
		const formData = {
			amount: Number(data.amount),
			id: itemToTransefareFrom.id,
			inventoryId: Number(selectedInventory),
		};
		console.log(formData);
		transfareItems(formData, {
			onSuccess: () => {
				reset();
				onCloseModal?.();
			},
		});
	}

	function onError(errors) {
		console.log(errors);
	}

	if (isLoading) return <Spinner />;

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Amount to transfare' error={errors?.amount?.message}>
				<Input
					type='number'
					id='amount'
					disabled={isTransfering}
					{...register('amount', {
						required: 'This field is required',
						validate: (value) =>
							Number(value) <= Number(itemToTransefareFrom.numberOfPieces) || 'no eanough transefare items',
					})}
				/>
			</FormRow>
			<FormRow label='Destination inventory' error={errors?.name?.message}>
				<Select
					options={inventories.map((inventory) => ({ value: inventory.id, label: inventory.location }))}
					value={selectedInventory}
					onChange={(e) => setSelectedInventory(e.target.value)}
					type='white'
				/>
			</FormRow>
			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isTransfering}>Transefare</Button>
			</FormRow>
		</Form>
	);
}

export default TransfareItemForm;
