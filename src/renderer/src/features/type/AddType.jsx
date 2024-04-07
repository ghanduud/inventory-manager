import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateUpdateTypeForm from './CreateUpdateTypeForm';

function AddType() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='type-form'>
					<Button>Add new Type</Button>
				</Modal.Open>
				<Modal.Window name='type-form'>
					<CreateUpdateTypeForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddType;
