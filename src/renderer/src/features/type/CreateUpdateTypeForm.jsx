import { useForm } from 'react-hook-form';

import { useCreateType } from './useCreateType';
import { useUpdateType } from './useUpdateType';

import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateUpdateTypeForm({ typeToUpdate = {}, onCloseModal }) {
	const { isCreating, createType } = useCreateType();
	const { isUpdateing, updateType } = useUpdateType();

	const isWorking = isCreating || isUpdateing;

	const { id: updateId, ...updateValues } = typeToUpdate;
	const isUpdatingSession = Boolean(updateId);

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isUpdatingSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isUpdatingSession) {
			updateType(
				{ ...data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createType(data, {
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
			<FormRow label='Type Name' error={errors?.name?.message}>
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
				<Button disabled={isWorking}>{isUpdatingSession ? 'Update Type' : 'Create new Type'}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateUpdateTypeForm;
