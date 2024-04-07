import Modal from '../../components/Modal';
import Button from '../../components/Button';

import CreateUpdateManufactureForm from './CreateUpdateManufactureForm';

function AddManufacture() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='manufacture-form'>
					<Button>Add new Manufacture</Button>
				</Modal.Open>
				<Modal.Window name='manufacture-form'>
					<CreateUpdateManufactureForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddManufacture;
