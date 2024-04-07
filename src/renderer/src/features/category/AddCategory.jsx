import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateUpdateCategoryForm from './CreateUpdateCategoryForm';

function AddCategory() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='category-form'>
					<Button>Add new category</Button>
				</Modal.Open>
				<Modal.Window name='category-form'>
					<CreateUpdateCategoryForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddCategory;
