import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateUpdateMaterialForm from './CreateUpdateMaterialForm';

function AddMaterial() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='material-form'>
					<Button>Add new Material</Button>
				</Modal.Open>
				<Modal.Window name='material-form'>
					<CreateUpdateMaterialForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddMaterial;
