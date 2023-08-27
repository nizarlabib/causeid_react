import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backend from '../api/backend';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [dataRace, setDataRace] = useState([]);
  const [raceProgres, setRaceProgres] = useState([]);
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");  
  const token = useSelector(state => state.token);

  useEffect(() => {

    if (token==null) {
      navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const fetchData = async () => {
      try {

        const raceResponse = await backend.get('/races/user/races', {
          headers: headers,
        });
        setUserData(raceResponse.data.data.user);
        setDataRace(raceResponse.data.data.races);

        const progresResponse = await backend.get('/races/user/progres', {
          headers: headers,
        });
        setRaceProgres(progresResponse.data.data.races);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [token]);
  

  return (
    <div>
      <Navbar />
        <div >
        {userData && (
          <h2 className="mt-5 ml-5 text-xl font-bold">Welcome {userData.username} !</h2>
          )}

          <p className="mt-5 ml-5 text-md ">User Profile</p>
          <div className="flex items-center justify-center">

          <table className="table-fixed w-full mt-5 border-collapse border border-gray-400">
            <thead>
              <tr className='sm:table-row'>
                <th className="border border-gray-400 px-4 py-2">Username</th>
                <th className="border border-gray-400 px-4 py-2">Firstname</th>
                <th className="border border-gray-400 px-4 py-2">Lastname</th>
              </tr>
            </thead>

            {userData && (
            <tbody className="text-center">
              <tr className='sm:table-row sm:text-sm'>
                <td className="border border-gray-400 px-4 py-2">{userData.username}</td>
                <td className="border border-gray-400 px-4 py-2">{userData.user_firstname}</td>
                <td className="border border-gray-400 px-4 py-2">{userData.user_lastname}</td>
              </tr>
            </tbody>
             )}
          </table>
          </div>
          <p className="mt-5 ml-5 text-md">Data Race</p>
          <div className="flex items-center justify-center sm:rounded-lg">
          <table className="table-fixed w-full mt-5 border-collapse border border-gray-400 text-sm">
            <thead>
              <tr className='sm:table-row max-w-lg'>
                <th className="border border-gray-400 px-4 py-2">No</th>
                <th className="border border-gray-400 px-4 py-2">Races</th>
                <th className="border border-gray-400 px-4 py-2">Picture</th>
                <th className="border border-gray-400 px-4 py-2">Jarak ditempuh</th>
                <th className="border-gray-400 px-4 py-2 leading-loose">Finish Kilometer</th>
                <th className="border border-gray-400 px-4 py-2">Progres</th>
              </tr>
            </thead>

            {dataRace && raceProgres && (
              <tbody className="text-center">
                {dataRace.map((race, index) => {
                  const progress = raceProgres.find(progresRaces => progresRaces.race_id === race.id);

                  return (
                    <tr className='sm:table-row' key={index}>
                      <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                      <td className="border border-gray-400 px-4 py-2">{race.race_name}</td>
                      <td className="border border-gray-400 px-4 py-2">
                        <img className="w-20" src={race.race_picture} alt="" />
                      </td>
                      <td className="border border-gray-400 px-4 py-2">{race.race_finishkilometer}</td>
                      {progress ? (
                        <>
                          <td className="border border-gray-400 px-4 py-2">{progress.total_kilometers}</td>
                          <td className="border border-gray-400 px-4 py-2">{progress.progress_races}%</td>
                        </>
                      ) : (
                        <>
                          <td className="border border-gray-400 px-4 py-2">0</td>
                          <td className="border border-gray-400 px-4 py-2">0%</td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            )}

          </table>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
