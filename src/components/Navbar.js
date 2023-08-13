import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
    const url = 'http://localhost/login/login.php';
  return (
    <div>
        <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold"><a href="#" className="text-white"><Link to="/">CauseID</Link></a></div>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-white"><Link to="/races">Races</Link></a></li>
            <li><a href="#" className="text-white"><Link to="/activities">Activity List</Link></a></li>
            <li><a href={url} className="text-white">Logout</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
