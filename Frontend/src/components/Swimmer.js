import React, { useState } from "react";
import axios from "axios";
import "./CSS/Swimmer.css"; // Import styling

const Swimmer = () => {
  // Initial State: The swimmers list starts as an empty array ([]), meaning there are no swimmers initially.
  /* 
     1️⃣ When the component first renders, `swimmers` is set to an empty array.
     2️⃣ When new swimmer data is fetched from the Flask backend, `setSwimmers` updates `swimmers` with the fetched data.
     3️⃣ The component re-renders whenever `swimmers` is updated, displaying the new list.
  */
  const [swimmers, setSwimmers] = useState([]);
  // Initial State: The list is hidden (`false`) when the component first renders.
  /* 
     1️⃣ When the component first renders, `isListVisible` is set to `false`, meaning the list is hidden.
     2️⃣ `setIsListVisible` updates `isListVisible` when needed, toggling the visibility of the swimmers' list.
     3️⃣ The component re-renders whenever `isListVisible` is updated, showing or hiding the list accordingly.
  */
  const [isListVisible, setIsListVisible] = useState(false);
  const [newSwimmer, setNewSwimmer] = useState({ name: "", age: "", gender: "" });

  // ✅ Fetch Swimmers
  const fetchSwimmers = async () => {
    try {
      // The await keyword pauses execution until the request is completed.
      const response = await axios.get("http://127.0.0.1:5000/swimmers");
      setSwimmers(response.data);
      setIsListVisible(true);
    } catch (error) {
      console.error("Error fetching swimmers:", error.response?.data || error.message);
    }
  };

  // ✅ Hide Swimmers
  const closeSwimmers = () => {
    setIsListVisible(false);
  };
  const DeleteSwimmer = async () => {
    try {
      const response = await axios.delete("http://127.0.0.1:5000/swimmer/delete_last");
      console.log(response.data);
      const deletedSwimmer = response.data.last_swimmer;
      alert(`Swimmer Deleted:\nID: ${deletedSwimmer.Swimmer_ID}\nName: ${deletedSwimmer.Name}\nAge: ${deletedSwimmer.Age}\nGender: ${deletedSwimmer.Gender}`);

      setIsListVisible(false);
    } catch (error) {
      alert(`Error: ${error.response.data.error}`);
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => { //The function takes an event (e) as a parameter.
    setNewSwimmer({
      ...newSwimmer, // Keep existing values
      [e.target.name]: e.target.value // Update the changed field, e.target.name gives the name of the input field (name, age, or gender).
    });
  };

  // ✅ Insert Swimmer (POST request)
  const insertSwimmer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/swimmer", newSwimmer, {
        headers: { "Content-Type": "application/json" }, // ✅ Required for Flask to parse JSON
      });

      console.log("Swimmer Added:", response.data);

      // ✅ Reset input fields to empty values
      setNewSwimmer({ name: "", age: "", gender: "" });

      // ✅ Close the swimmers list
      setIsListVisible(false);
    } catch (error) {
      console.error("Error adding swimmer:", error.response?.data || error.message);
    }
  };

  return (
    <div className="swimmer-container">
      <div className="swimmer-text-bar">
        <h2>Swimmer Check</h2>
        <p>Select a swimmer from the database and view their data.</p>

        {/* ✅ Buttons */}
        {!isListVisible ? (
          <button className="load-button" onClick={fetchSwimmers}>Load Swimmers</button>
        ) : (
          <button className="close-button" onClick={closeSwimmers}>Close Swimmers</button>
        )}

        {/* ✅ Swimmers List */}
        {isListVisible && (//It ensures that the element inside the parentheses only renders when isListVisible is true
          <ul className="swimmer-list">
            {swimmers.map((swimmer, index) => (
              <li className="swimmer-item" key={index}>
                {swimmer.Swimmer_ID}: {swimmer.Name}, Age: {swimmer.Age}, Gender: {swimmer.Gender}
              </li>
            ))}
          </ul>
        )}

        {/* ✅ Insert Swimmer Form */}
        <form className="swimmer-form" onSubmit={insertSwimmer}>
          <h3>Add a New Swimmer</h3>
          <input type="text" name="name" placeholder="Name" value={newSwimmer.name} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={newSwimmer.age} onChange={handleChange} required />
          <select name="gender" value={newSwimmer.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" className="add-button">Add Swimmer</button>
        </form>
        <button type="submit" className="Delete-Swimmer" onClick={DeleteSwimmer}>Delete Swimmer</button>
      </div>
    </div>
  );
};

export default Swimmer;
