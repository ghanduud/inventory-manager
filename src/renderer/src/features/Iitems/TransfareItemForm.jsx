import { useForm } from 'react-hook-form';
import { useInventory } from '../inventories/useInventory';

import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import { useTransfareItems } from './useTransfareItems';
import SelectForm from '../../components/SelectForm';

function TransfareItemForm({ itemToTransferFrom, onCloseModal, totalItemWeight }) {
	const { transfareItems, isTransfering } = useTransfareItems();

	const { isLoading, inventories } = useInventory();
	const { register, handleSubmit, reset, formState } = useForm();
	const { errors } = formState;

	// State to store the selected inventory ID
	function onSubmit(data) {
		let formData;

		if (data.sendBy === 'kilo') {
			const amount = (data.amount * itemToTransferFrom.numberOfPieces) / totalItemWeight;
			formData = {
				amount,
				id: itemToTransferFrom.id,
				inventoryId: data.inventoryId, // Make sure to include the selected option for the first select element
			};
		} else {
			formData = {
				amount: Number(data.amount),
				id: itemToTransferFrom.id,
				inventoryId: data.inventoryId, // Make sure to include the selected option for the first select element
			};
		}

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
			<FormRow label='You want to send by: ' error={errors?.sendBy?.message}>
				<SelectForm
					options={[
						{ value: 'pieces', label: 'Pieces' },
						{ value: 'kilo', label: 'Kilo' },
					]}
					register={register}
					type='white'
					name='sendBy' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow label='Amount to transfer' error={errors?.amount?.message}>
				<Input
					type='number'
					id='amount'
					disabled={isTransfering}
					{...register('amount', {
						required: 'This field is required',
						validate: (value) =>
							Number(value) <= Number(itemToTransferFrom.numberOfPieces) || 'Not enough transferable items',
					})}
				/>
			</FormRow>
			<FormRow label='Destination inventory' error={errors?.inventoryId?.message}>
				<SelectForm
					options={inventories.map((inventory) => ({ value: inventory.id, label: inventory.location }))}
					register={register}
					type='white'
					name='inventoryId' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isTransfering}>Transfer</Button>
			</FormRow>
		</Form>
	);
}

export default TransfareItemForm;
