import React, { useState } from "react";
import "./CSS/ML.css";

const ML = () => {
  const [input, setInput] = useState({
    Training_Load: "",
    Max_HR: "",
    Calories_Burned: "",
  });

  const [result, setResult] = useState(null);
  const [gptQuestion, setGptQuestion] = useState("");
  const [gptAnswer, setGptAnswer] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Training_Load: Number(input.Training_Load),
        Max_HR: Number(input.Max_HR),
        Calories_Burned: Number(input.Calories_Burned),
      }),
    });

    const data = await response.json();
    console.log("GPT response:", data);
    setResult(data.Predicted_Total_Distance);
  };

  const handleAsk = async () => {
    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: gptQuestion }),
    });
    const data = await response.json();
    setGptAnswer(data.answer);
  };

  return (
    <>
      <div className="swimmer-inputs">
        <h3 className="section-title">Machine Learning Model Evaluation Summary</h3>
        <p>
          In this project, I applied several machine learning models to analyze and predict
          performance metrics related to swimmers' training sessions. The goal was to model
          variables such as Total Distance and Calories Burned based on features like Training Load,
          Heart Rate, and stroke-specific distances.
          <br /><br />
          The models I implemented included:
          <br />
          - Decision Tree Regressor
          <br />
          - Random Forest Regressor
          <br />
          - Neural Network Regressor using TensorFlow
          <br />
          - Linear Regression
          <br /><br />
          After training and evaluating all models using standard metrics like Root Mean Squared
          Error (RMSE) and R² Score, the Linear Regression model yielded the most accurate and
          interpretable results. (95%)
          <br /><br />
          In the Phlex app, Training Load is a numerical score that reflects how much physical stress
          your body experiences during a swim workout. (0-50 value)
        </p>
      </div>

      {/* Prediction Section */}
      <div className="swimmer-inputs">
        <h3>Distance Prediction Based on Training Metrics</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="Training_Load"
            placeholder="Training Load"
            onChange={handleChange}
            className="input-box"
            min="0"
            max="200"
            required
          />
          <input
            type="number"
            name="Max_HR"
            placeholder="Max HR (BPM)"
            onChange={handleChange}
            className="input-box"
            min="0"
            max="200"
            required
          />
          <input
            type="number"
            name="Calories_Burned"
            placeholder="Calories Burned"
            onChange={handleChange}
            className="input-box"
            min="0"
            max="3000"
            required
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>

        {result !== null && (
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            Predicted Total Distance: {result} yards
          </p>
        )}
      </div>

      {/* GPT Q&A Section */}
      <div className="swimmer-inputs" style={{ marginTop: "40px" }}>
        <h3>Ask the Intelligent Assistant About Swimmer Data</h3>
        <input
          type="text"
          placeholder="e.g., Who burned the most calories?"
          value={gptQuestion}
          onChange={(e) => setGptQuestion(e.target.value)}
          className="input-box"
        />
        <button onClick={handleAsk} className="submit-button">Ask</button>

        {gptAnswer && (
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            Answer: {gptAnswer}
          </p>
        )}
      </div>
    </>
  );
};

export default ML;
