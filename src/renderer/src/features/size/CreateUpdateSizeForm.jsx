import { useForm } from 'react-hook-form';

import { useCreateSize } from './useCreateSize';
import { useUpdateSize } from './useUpdateSize';

import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateUpdateSizeForm({ sizeToUpdate = {}, onCloseModal }) {
	const { isCreating, createSize } = useCreateSize();
	const { isUpdateing, updateSize } = useUpdateSize();

	const isWorking = isCreating || isUpdateing;

	const { id: updateId, ...updateValues } = sizeToUpdate;
	const isUpdatingSession = Boolean(updateId);

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isUpdatingSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isUpdatingSession) {
			updateSize(
				{ ...data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createSize(data, {
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
			<FormRow label='Size Name' error={errors?.name?.message}>
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
				<Button disabled={isWorking}>{isUpdatingSession ? 'Update Size' : 'Create new Size'}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateUpdateSizeForm;
