import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JsPDF from 'jspdf';
import backend from '../api/backend';
import Navbar from '../components/Navbar';

const Races = () => {
  const [dataRace, setDataRace] = useState([]);
  const [dataStatus, setDataStatus] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const fetchData = async () => {
      try {

        const raceResponse = await backend.get('/races', {
          headers: headers,
        });
        setDataRace(raceResponse.data.data);

        const progresResponse = await backend.get('/races/user/status', {
          headers: headers,
        });
        setDataStatus(progresResponse.data.data.races);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [token]);

  return (
    
    <div>
      <Navbar />
        <div>
            <table className="table-auto w-full mt-5 border-collapse border border-gray-400">
                <thead>
                    <tr>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">No</th>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">Race Name</th>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">Race Picture</th>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">Race Start</th>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">Race End</th>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">Race Description</th>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">Race Finish Kilometers</th>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">Status</th>
                    <th className="border border-gray-400 px-4 py-2 px-4 py-2">Daftar</th>
                    </tr>
                </thead>
                {dataRace && dataStatus && (
                <tbody className="text-center">
                {dataRace.map((race, index) => (
                        <tr>
                        <td className="border border-gray-400 px-4 py-2 px-4 py-2" key={index}>{(index+1)}</td>
                        <td className="border border-gray-400 px-4 py-2 px-4 py-2" key={index}>{race.race_name}</td>
                        <td className="border border-gray-400 px-4 py-2 px-4 py-2" key={index}><img className="w-20" src={race.race_picture} alt="" /></td>
                        <td className="border border-gray-400 px-4 py-2 px-4 py-2" key={index}>{race.race_startdatetime}</td>
                        <td className="border border-gray-400 px-4 py-2 px-4 py-2" key={index}>{race.race_enddatetime}</td>
                        <td className="border border-gray-400 px-4 py-2 px-4 py-2" key={index}>{race.race_description}</td>
                        <td className="border border-gray-400 px-4 py-2 px-4 py-2" key={index}>{race.race_finishkilometer}</td>
                        {dataStatus[index] ? (
                          <>
                            <td className="border border-gray-400 px-4 py-2">{dataStatus[index].status}</td>
                            <td className="border border-gray-400 px-4 py-2 px-4 py-2" key={index}></td>
                          </>
                        ) : (
                          <>
                            <td className="border border-gray-400 px-4 py-2">Belum Terdaftar</td>
                            <td className="border border-gray-400 px-4 py-2"><button className="bg-green-500 text-white p-1 rounded"><Link to={`/registrasi/${race.id}`}>Registrasi</Link></button></td>
                            
                          </>
                        )}

                        </tr>
                    ))}
                </tbody>
            )}
            </table>
        </div>
    </div>
  );
}

export default Races;
