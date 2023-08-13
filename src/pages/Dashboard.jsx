import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [dataRace, setDataRace] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/1')
      .then(response => {
        setUserData(response.data.data);
        localStorage.setItem('userData', JSON.stringify(response.data.data));
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/races/progress/1')
      .then(response => {
        setDataRace(response.data.data);
        console.log(dataRace);
      })
      .catch(error => {
        console.error('Error fetching race data:', error);
      });
  }, []);

  return (
    <div>
      {userData && (
        <div>
          <h2 className="mt-5 ml-5 text-xl font-bold">Welcome {userData.user_firstname} !</h2>
          <table className="table-auto w-full mt-5">
            <thead>
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Firstname</th>
                <th className="px-4 py-2">Lastname</th>
                <th className="px-4 py-2">Races</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="px-4 py-2">{userData.username}</td>
                <td className="px-4 py-2">{userData.user_firstname}</td>
                <td className="px-4 py-2">{userData.user_lastname}</td>
                <td className="px-4 py-2">
                  {dataRace.length > 0 ? (
                    <ul>
                      {dataRace.map((race, index) => (
                        <li key={index}>{race.race_name} (Jarak yang didapat = {race.activity_kilometers}) (Finish kilometers = {race.race_finishkilometer}) (Progress = {race.progress_races}%)</li>
                      ))}
                    </ul>
                  ) : (
                    'No race data available'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
