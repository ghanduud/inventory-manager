import { useForm } from 'react-hook-form';
import { useCreateInventory } from './useCreateInventory';
import { useUpdateInventory } from './useUpdateInventory';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateUpdateInventoryForm({ inventoryToUpdate = {}, onCloseModal }) {
	const { isCreating, createInventory } = useCreateInventory();
	const { isUpdateing, updateInventory } = useUpdateInventory();

	const isWorking = isCreating || isUpdateing;

	const { id: updateId, ...updateValues } = inventoryToUpdate;
	const isUpdatingSession = Boolean(updateId);

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isUpdatingSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (data.maxCapacity === '') data.maxCapacity = 99999999;

		if (isUpdatingSession) {
			updateInventory(
				{ ...data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createInventory(data, {
				onSuccess: () => {
					reset();
					onCloseModal?.();
				},
			});
		}
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'Modal' : 'reguler'}>
			<FormRow label='Location' error={errors?.location?.message}>
				<Input
					type='text'
					id='location'
					disabled={isWorking}
					{...register('location', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
				<Input type='number' id='maxCapacity' disabled={isWorking} {...register('maxCapacity')} />
			</FormRow>
			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>{isUpdatingSession ? 'Update Inventory' : 'Create new Invetory'}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateUpdateInventoryForm;
