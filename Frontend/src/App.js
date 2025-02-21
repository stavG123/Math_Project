import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; 
import Swimmer from "./components/Swimmer"; // Import the new Swimmer page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home Page */}
        <Route path="/swimmer" element={<Swimmer />} />  {/* Swimmer Page */}
      </Routes>
    </Router>
  );
}

export default App;
