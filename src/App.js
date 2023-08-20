import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Races from "./pages/Races";
import Registrasi from './pages/Registrasi';
import Activities from "./pages/Activities";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddActivity from './pages/AddActivity';

function App() {

  return (
    <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/races" element={<Races />} />
          <Route path="/registrasi/:id" element={<Registrasi />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/add-activity" element={<AddActivity />} />
        </Routes>
    </div>
  );
};

export default App;
