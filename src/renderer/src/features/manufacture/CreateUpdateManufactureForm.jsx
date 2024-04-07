import { useForm } from 'react-hook-form';

import { useCreateManufacture } from './useCreateManufacture';
import { useUpdateManufacture } from './useUpdateManufacture';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateUpdateManufactureForm({ manufactureToUpdate = {}, onCloseModal }) {
	const { isCreating, createManufacture } = useCreateManufacture();
	const { isUpdateing, updateManufacture } = useUpdateManufacture();

	const isWorking = isCreating || isUpdateing;

	const { id: updateId, ...updateValues } = manufactureToUpdate;
	const isUpdatingSession = Boolean(updateId);

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isUpdatingSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isUpdatingSession) {
			updateManufacture(
				{ ...data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createManufacture(data, {
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
			<FormRow label='Manufacture Name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow label='Manufacture Email' error={errors?.email?.message}>
				<Input
					type='text'
					id='email'
					disabled={isWorking}
					{...register('email', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow label='Manufacture Phone Number' error={errors?.phoneNumber?.message}>
				<Input
					type='text'
					id='phoneNumber'
					disabled={isWorking}
					{...register('phoneNumber', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isUpdatingSession ? 'Update Manufacture' : 'Create new Manufacture'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateUpdateManufactureForm;
