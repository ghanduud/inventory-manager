// import React from 'react';
// import { ipcRenderer } from 'electron';

function App() {
  async function handleAddUser() {
    const res = await window.apiUser.addUser('Ghandy');
    console.log(res);
  }

  return (
    <div>
      <button onClick={handleAddUser}>Add user</button>
    </div>
  );
}

export default App;
