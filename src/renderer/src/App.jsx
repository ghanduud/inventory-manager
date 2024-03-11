function App() {
	async function handleAddUser() {
		const res = await window.apiManufacture.getManufacture(1);
		console.log(res);
	}

	return (
		<div>
			<button onClick={handleAddUser}>Add Manufacture</button>
		</div>
	);
}

export default App;
