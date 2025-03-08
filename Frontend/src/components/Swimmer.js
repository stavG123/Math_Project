import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table"; // ✅ Import react-table
import "./CSS/Swimmer.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";





const Swimmer = () => {
  const [swimmers, setSwimmers] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [newSwimmer, setNewSwimmer] = useState({ name: "", age: "", gender: "" });
  const [selectedSwimmerId, setSelectedSwimmerId] = useState("");
  const [topDistances, setTopDistances] = useState([]);
  const [topCal, setTopCal] = useState([]);
  const [topsplash, setTopsplash] = useState([]);
  const [selectedSwimmer, setSelectedSwimmer] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [calorieChartData, setCalorieChartData] = useState([]);
  const [radarChartData, setRadarChartData] = useState([]);


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
      {
        Header: "Calories Burned",
        accessor: "Calories_Burned",
      },
      {
        Header: "Swimming Time",
        accessor: "total_time",
      },
      {
        Header: "splash_score",
        accessor: "splash_score",
      },
      {
        Header: "training_load",
        accessor: "training_load"
      },
      {
        Header: "max_hr",
        accessor: "max_hr"
      },
      {
        Header: "average_hr",
        accessor: "average_hr"
      },
      {
        Header: "Date",
        accessor: "Date"

      }

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

    if (swimmerId === "") {
      // ✅ Reset data when no swimmer is selected
      setTopDistances([]);
      setTopCal([]);
      setTopsplash([]);
      setSelectedSwimmer(null);
      return;
    }

    const swimmer = swimmers.find((s) => s.Swimmer_ID.toString() === swimmerId);
    setSelectedSwimmer(swimmer);

    // ✅ Fetch top 5 distances from the backend
    try {
      const response = await axios.get(`http://127.0.0.1:5000/swimmer/${swimmerId}/top_distances`);
      setTopDistances(response.data);

      const response2 = await axios.get(`http://127.0.0.1:5000/swimmer/${swimmerId}/calories_burned`);
      setTopCal(response2.data);

      const response3 = await axios.get(`http://127.0.0.1:5000/swimmer/${swimmerId}/splash_score`);
      setTopsplash(response3.data);

      const formattedChartData = response.data.map((item) => ({
        date: item.Date,
        distance: item.Distance
      }));
      setChartData(formattedChartData);
      const formattedCalorieChartData = response2.data.map((item) => ({
        date: item.Date,
        calories: item.Calories_Burned,
        time: item.total_time
      }));
      setCalorieChartData(formattedCalorieChartData);

      const formattedRadarData = response3.data.map((item) => ({
        date: item.Date,
        SplashScore: item.splash_score,
        TrainingLoad: item.training_load,
        MaxHR: item.max_hr,
        AvgHR: item.average_hr,
      }));



      setRadarChartData(formattedRadarData);


    } catch (error) {
      console.error("Error fetching top distances:", error.response?.data || error.message);
      setTopDistances([]); // Reset if error
      setTopCal([]);
      setTopsplash([]);
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
          <option value="">Choose a swimmer</option> {/* ✅ Ensure this has an empty value */}
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

      {topCal.length > 0 && (
        <div className="table-container">
          <h3>Top 5 Calories with Time (Calories Highest)</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Calories Burned</th>
                <th>Swimming Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {topCal.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.Calories_Burned} </td>
                  <td>{row.total_time} Min</td>
                  <td>{row.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {topsplash.length > 0 && (
        <div className="table-container">
          <h3>Top 5 splash score </h3>
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Splash Score (Swimmer’s Efficiency)</th>
                <th>Training Load (the intensity and volume of a swimmer)</th>
                <th>Max Hr</th>
                <th>AVG Hr</th>
                <th>Date</th>

              </tr>
            </thead>
            <tbody>
              {topsplash.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.splash_score} </td>
                  <td>{row.training_load} </td>
                  <td>{row.max_hr} </td>
                  <td>{row.average_hr} </td>
                  <td>{row.Date} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {chartData.length > 0 && (
        <div className="chart-container">
          <h3>Top 5 Distances Over Time Graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="distance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {calorieChartData.length > 0 && (
        <div className="chart-container">
          <h3>Calories Burned vs. Swimming Time Graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calorieChartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calories" fill="#ff7300" name="Calories Burned" />
              <Bar dataKey="time" fill="#387908" name="Swimming Time (Min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {radarChartData.length > 0 && (
        <div className="chart-container">
          <h3>Swimmer Performance Metrics Graph</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="date" />  {/* Date as categories */}
              <PolarRadiusAxis />

              {/* Different colors for each metric */}
              <Radar name="Splash Score" dataKey="SplashScore" stroke="#FF5733" fill="#FF5733" fillOpacity={0.6} />
              <Radar name="Training Load" dataKey="TrainingLoad" stroke="#33FF57" fill="#33FF57" fillOpacity={0.6} />
              <Radar name="Max HR" dataKey="MaxHR" stroke="#3357FF" fill="#3357FF" fillOpacity={0.6} />
              <Radar name="Avg HR" dataKey="AvgHR" stroke="#000000" fill="#000000" fillOpacity={0.6} /> {/* Black for Avg HR */}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>

        </div>
      )}
    </div>
  );
};

export default Swimmer; 