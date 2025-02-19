import React from 'react';


function Prediction({ result }) {
  return (
    <div>
      <h2>Prediction</h2>
      <p>{result ? `Predicted Value: ${result}` : 'Submit data to get a prediction'}</p>
    </div>
  );
}

export default Prediction;