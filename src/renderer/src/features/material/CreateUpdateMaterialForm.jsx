import { useForm } from 'react-hook-form';

import { useCreateMaterial } from './useCreateMaterial';
import { useUpdateMaterial } from './useUpdateMaterial';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateUpdateMaterialForm({ materialToUpdate = {}, onCloseModal }) {
	const { isCreating, createMaterial } = useCreateMaterial();
	const { isUpdateing, updateMaterial } = useUpdateMaterial();

	const isWorking = isCreating || isUpdateing;

	const { id: updateId, ...updateValues } = materialToUpdate;
	const isUpdatingSession = Boolean(updateId);

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isUpdatingSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isUpdatingSession) {
			updateMaterial(
				{ ...data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createMaterial(data, {
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
			<FormRow label='Material Name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>{isUpdatingSession ? 'Update Material' : 'Create new Material'}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateUpdateMaterialForm;
