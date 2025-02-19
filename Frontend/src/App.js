import React from 'react';
import DataInput from './components/DataInput';
import Prediction from "./components/Prediction";
import Chart from './components/Chart';
import Navbar from "./components/Navbar"; // Import Navbar

function App() {
  return (
    <div>
      <Navbar />
      <h1>Swim Performance Predictor</h1>
      <DataInput />
      <Prediction />
      <Chart />
    </div>
  );
}

export default App;
