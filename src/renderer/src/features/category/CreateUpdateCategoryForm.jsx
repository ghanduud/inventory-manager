import { useForm } from 'react-hook-form';

import { useCreateCategory } from './useCreateCategory';
import { useUpdateCategory } from './useUpdateCategory';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateUpdateCategoryForm({ categoryToUpdate = {}, onCloseModal }) {
	const { isCreating, createCategory } = useCreateCategory();
	const { isUpdateing, updateCategory } = useUpdateCategory();

	const isWorking = isCreating || isUpdateing;

	const { id: updateId, ...updateValues } = categoryToUpdate;
	const isUpdatingSession = Boolean(updateId);

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isUpdatingSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isUpdatingSession) {
			updateCategory(
				{ ...data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createCategory(data, {
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
			<FormRow label='Category Name' error={errors?.name?.message}>
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
				<Button disabled={isWorking}>{isUpdatingSession ? 'Update Category' : 'Create new Category'}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateUpdateCategoryForm;
