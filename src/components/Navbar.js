import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backend from '../api/backend';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const handleLogout = async () => {
    try {
      await backend.get('/auth/logout', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem("token");
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
        <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold"><a href="#" className="text-white"><Link to="/dashboard">CauseID</Link></a></div>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-white"><Link to="/races">Races</Link></a></li>
            <li><a href="#" className="text-white"><Link to="/activities">Activity List</Link></a></li>
            <li><button href="#" className="text-white" onClick={handleLogout}><Link to="/login">Logout</Link></button></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
