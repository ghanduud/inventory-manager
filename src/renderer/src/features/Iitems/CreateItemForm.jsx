import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useCreateItem } from './useCreateItem';
import { useCategory } from '../category/useCategory';
import { useInventory } from '../inventories/useInventory';
import { useManufacture } from '../manufacture/useManufacture';
import { useMaterial } from '../material/useMaterial';
import { useSize } from '../size/useSize';
import { useType } from '../type/useType';

import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import SelectForm from '../../components/SelectForm';
import Spinner from '../../components/Spinner';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateItemForm({ onCloseModal }) {
	const { isLoading: isLoadingCategory, categories } = useCategory();
	const { isLoading: isLoadingInventory, inventories } = useInventory();
	const { isLoading: isLoadingManufacture, manufactures } = useManufacture();
	const { isLoading: isLoadingMaterial, materials } = useMaterial();
	const { isLoading: isLoadingSize, sizes } = useSize();
	const { isLoading: isLoadingType, types } = useType();

	const isLoading =
		isLoadingCategory ||
		isLoadingInventory ||
		isLoadingManufacture ||
		isLoadingMaterial ||
		isLoadingSize ||
		isLoadingType;

	const [isWeightPerPieceFilled, setIsWeightPerPieceFilled] = useState(false);

	const { isCreating, createItem } = useCreateItem();

	const { register, handleSubmit, reset, getValues, setValue, formState } = useForm();

	const { errors } = formState;

	function onSubmit(data) {
		const numberedData = {
			...data,
			weightPerPiece: data.weightPerPiece,
			numberOfPieces: data.numberOfPieces,
			kilo: data.kilo,
		};
		createItem(numberedData, {
			onSuccess: () => {
				reset();
				onCloseModal?.();
			},
		});
	}

	function onError(errors) {
		console.log(errors);
	}

	function handleWeightChange(e) {
		const weightValue = e.target.value;
		setIsWeightPerPieceFilled(weightValue === '' ? false : true);
	}

	function handleKiloChange(e) {
		const kilo = parseFloat(e.target.value);
		const numberOfPieces = kilo ? kilo / getValues('weightPerPiece') : '';
		setValue('numberOfPieces', numberOfPieces);
	}

	function handleNumberOfPiecesChange(e) {
		const numberOfPieces = parseInt(e.target.value);
		const kilo = numberOfPieces ? numberOfPieces * getValues('weightPerPiece') : '';
		setValue('kilo', kilo);
	}

	if (isLoading) return <Spinner />;

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Category' error={errors?.categoryId?.message}>
				<SelectForm
					options={categories.map((category) => ({ value: category.id, label: category.name }))}
					register={register}
					type='white'
					name='categoryId' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow label='Material' error={errors?.materialId?.message}>
				<SelectForm
					options={materials.map((material) => ({ value: material.id, label: material.name }))}
					register={register}
					type='white'
					name='materialId' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow label='Type' error={errors?.typeId?.message}>
				<SelectForm
					options={types.map((type) => ({ value: type.id, label: type.name }))}
					register={register}
					type='white'
					name='typeId' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow label='Size' error={errors?.sizeId?.message}>
				<SelectForm
					options={sizes.map((size) => ({ value: size.id, label: size.name }))}
					register={register}
					type='white'
					name='sizeId' // Make sure to provide a name for the select element
				/>
			</FormRow>

			<FormRow label='Manufacture' error={errors?.manufactureId?.message}>
				<SelectForm
					options={manufactures.map((manufacture) => ({ value: manufacture.id, label: manufacture.name }))}
					register={register}
					type='white'
					name='manufactureId' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow label='Price per Kilo' error={errors?.pricePerKilo?.message}>
				<Input
					type='number'
					id='pricePerKilo'
					disabled={isCreating}
					{...register('pricePerKilo', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow label='Weight per Piece' error={errors?.weightPerPiece?.message}>
				<Input
					type='number'
					id='weightPerPiece'
					disabled={isCreating}
					{...register('weightPerPiece', {
						required: 'This field is required',
					})}
					onChange={handleWeightChange}
				/>
			</FormRow>

			<FormRow label='pieces' error={errors?.numberOfPieces?.message}>
				<Input
					type='number'
					id='numberOfPieces'
					disabled={isCreating || !isWeightPerPieceFilled}
					{...register('numberOfPieces', {
						required: 'This field is required',
					})}
					onChange={handleNumberOfPiecesChange}
				/>
			</FormRow>
			<FormRow label='Kilo' error={errors?.kilo?.message}>
				<Input
					type='number'
					id='kilo'
					disabled={isCreating || !isWeightPerPieceFilled}
					{...register('kilo', {
						required: 'This field is required',
					})}
					onChange={handleKiloChange}
				/>
			</FormRow>
			<FormRow label='Inventory' error={errors?.inventoryId?.message}>
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
				<Button disabled={isCreating}>Create Item</Button>
			</FormRow>
		</Form>
	);
}

export default CreateItemForm;
