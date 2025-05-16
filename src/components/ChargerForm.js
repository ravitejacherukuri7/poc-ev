import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function ChargerForm() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (name.trim() === '') return;
    dispatch({ type: 'chargers/add', payload: { name } });
    setName('');
  };

  return (
    <div className="charger-form">
      <input
        type="text"
        placeholder="Charger Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add Charger</button>
    </div>
  );
}

export default ChargerForm;