function App() {
	async function handleAddUser() {
		const res = await window.apiCategory.addCategory('Moshtrk');
		console.log(res);
	}

	return (
		<div>
			<button onClick={handleAddUser}>Add Manufacture</button>
		</div>
	);
}

export default App;
