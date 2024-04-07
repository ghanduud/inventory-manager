import { useForm } from 'react-hook-form';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import { useUpdatePrice } from './useUpdatePrice';
import Input from '../../components/Input';
import Button from '../../components/Button';

function UpdatePriceForm({ itemPriceToUpdate, onCloseModal }) {
	const { updatePrice, isUpdating } = useUpdatePrice();

	const { id: updateId, ...updateValues } = itemPriceToUpdate;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: updateValues,
	});

	const { errors } = formState;

	function onSubmit(data) {
		updatePrice(
			{ ...data, id: updateId },
			{
				onSuccess: () => {
					reset();
					onCloseModal?.();
				},
			}
		);
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'Modal' : 'reguler'}>
			<FormRow label='New Price' error={errors?.pricePerKilo?.message}>
				<Input type='number' id='pricePerKilo' disabled={isUpdating} {...register('pricePerKilo')} />
			</FormRow>
			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isUpdating}>Update Price</Button>
			</FormRow>
		</Form>
	);
}

export default UpdatePriceForm;
