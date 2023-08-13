import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Races from "./pages/Races";
import Navbar from "./components/Navbar";
import Registrasi from './pages/Registrasi';
import Activities from "./pages/Activities";

function App() {
  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/races" element={<Races />} />
            <Route path="/registrasi" element={<Registrasi />} />
            <Route path="/activities" element={<Activities />} />
          </Routes>
    </div>
  );
}

export default App;
