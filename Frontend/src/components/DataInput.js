import React, { useState } from 'react';

function DataInput() {
  const [input, setInput] = useState({ Training_Load: '', Max_HR: '', Total_Distance: '' });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    const data = await response.json();
    console.log('Prediction:', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="Training_Load" onChange={handleChange} placeholder="Training Load" />
      <input type="number" name="Max_HR" onChange={handleChange} placeholder="Max HR (BPM)" />
      <input type="number" name="Total_Distance" onChange={handleChange} placeholder="Total Distance" />
      <button type="submit">Predict</button>
    </form>
  );
}

export default DataInput;