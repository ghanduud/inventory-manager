function App() {
	async function handleAddUser() {
		const res = await window.apiItem.transferItems(2, 100, 3);
		console.log(res);
	}

	return (
		<div>
			<button onClick={handleAddUser}>Add Manufacture</button>
		</div>
	);
}

export default App;
