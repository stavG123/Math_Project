import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; 
import Swimmer from "./components/Swimmer"; 
import ML from "./components/ML"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home Page */}
        <Route path="/swimmer" element={<Swimmer />} />  {/* Swimmer Page */}
        <Route path="/ML" element={<ML />} />  
      </Routes>
    </Router>
  );
}

export default App;
