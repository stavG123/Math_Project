import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table"; // ✅ Import react-table
import "./CSS/Swimmer.css";

const Swimmer = () => {
  const [swimmers, setSwimmers] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [newSwimmer, setNewSwimmer] = useState({ name: "", age: "", gender: "" });
  const [selectedSwimmerId, setSelectedSwimmerId] = useState("");
  const [topDistances, setTopDistances] = useState([]);
  const [selectedSwimmer, setSelectedSwimmer] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "Rank",
        accessor: (row, index) => index + 1, // Auto number ranking
      },
      {
        Header: "Distance (Yards)",
        accessor: "Distance",
      },
    ],
    []
  );




  // ✅ Fetch Swimmers
  const fetchSwimmers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/swimmers");
      const sortedSwimmers = response.data.sort((a, b) => a.Swimmer_ID - b.Swimmer_ID);
      setSwimmers(sortedSwimmers);
      setIsListVisible(true);  // Show the list only when "Load Swimmers" is clicked
    } catch (error) {
      console.error("Error fetching swimmers:", error.response?.data || error.message);
    }
  };

  const handleSwimmerSelect = async (e) => {
    const swimmerId = e.target.value;
    setSelectedSwimmerId(swimmerId);

    const swimmer = swimmers.find((s) => s.Swimmer_ID.toString() === swimmerId);
    setSelectedSwimmer(swimmer); 

    // ✅ Fetch top 5 distances from the backend
    try {
      const response = await axios.get(`http://127.0.0.1:5000/swimmer/${swimmerId}/top_distances`);
      setTopDistances(response.data);
    } catch (error) {
      console.error("Error fetching top distances:", error.response?.data || error.message);
      setTopDistances([]); // Reset if error
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
      setNewSwimmer({ name: "", age: "", gender: "" });
      setIsListVisible(false);
      alert("Error adding swimmer, Swimmer Already Exists")

    }

  };

  return (
    <div className="swimmer-container">
      {/* Header Section */}
      <div className="swimmer-text-bar">
        <h2>Swimmer Check</h2>
        <p>Select a swimmer from the database and view their data.</p>

        {/* Load/Close Swimmers Button */}
        {!isListVisible ? (
          <button className="load-button" onClick={fetchSwimmers}>
            Load Swimmers
          </button>
        ) : (
          <button className="close-button" onClick={closeSwimmers}>
            Close Swimmers
          </button>
        )}

        {/* Swimmer List */}
        {isListVisible && (
          <ul className="swimmer-list">
            {swimmers.map((swimmer, index) => (
              <li className="swimmer-item" key={index}>
                {swimmer.Swimmer_ID}: {swimmer.Name}, Age: {swimmer.Age}, Gender: {swimmer.Gender}
              </li>
            ))}
          </ul>
        )}

        {/* Insert New Swimmer Form */}
        <form className="swimmer-form" onSubmit={insertSwimmer}>
          <h3>Add a New Swimmer</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newSwimmer.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newSwimmer.age}
            onChange={handleChange}
            required
          />
          <select name="gender" value={newSwimmer.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" className="add-button">Add Swimmer</button>
        </form>

        {/* Delete Swimmer Button */}
        <button className="Delete-Swimmer" onClick={DeleteSwimmer}>
          Delete Swimmer
        </button>
      </div>

      {/* Swimmer Selection Dropdown */}
      <div className="Swimmer-drop">
        <select value={selectedSwimmerId} onChange={handleSwimmerSelect}>
          <option value="">Choose a swimmer</option>
          {swimmers.map((swimmer) => (
            <option key={swimmer.Swimmer_ID} value={swimmer.Swimmer_ID}>
              {swimmer.Name} (Age: {swimmer.Age}, Gender: {swimmer.Gender})
            </option>
          ))}
        </select>
      </div>

      {/* Top 5 Distances Table */}
      {topDistances.length > 0 && (
        <div className="table-container">
          <h3>Top 5 Distances</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Distance (Yards)</th>
                <th>Date</th> 
              </tr>
            </thead>
            <tbody>
              {topDistances.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.Distance}</td>
                  <td>{row.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Swimmer;