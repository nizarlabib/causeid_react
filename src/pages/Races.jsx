import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Races = () => {
  const [raceData, setRaceData] = useState(null);
  const [storedUserData, setStoredUserData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/races/1')
      .then(response => {
        setRaceData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    
    <div>
      {raceData && (
        <div>
            <table class="table-auto w-full mt-5">
                <thead>
                    <tr>
                    <th class="px-4 py-2">Race Name</th>
                    <th class="px-4 py-2">Race Picture</th>
                    <th class="px-4 py-2">Race Start</th>
                    <th class="px-4 py-2">Race End</th>
                    <th class="px-4 py-2">Race Description</th>
                    <th class="px-4 py-2">Race Finish Kilometers</th>
                    <th class="px-4 py-2">Status</th>
                    <th class="px-4 py-2">Daftar</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                {raceData.map((race, index) => (
                        <tr>
                        <td class="px-4 py-2" key={index}>{race.race_name}</td>
                        <td class="px-4 py-2" key={index}>{race.race_picture}</td>
                        <td class="px-4 py-2" key={index}>{race.race_startdatetime}</td>
                        <td class="px-4 py-2" key={index}>{race.race_enddatetime}</td>
                        <td class="px-4 py-2" key={index}>{race.race_description}</td>
                        <td class="px-4 py-2" key={index}>{race.race_finishkilometer}</td>
                        <td class="px-4 py-2" key={index}>{race.status}</td>
                        <td className="px-4 py-2" key={index}>
                            {race.status === "Belum Terdaftar" ? (
                                <a class="text-blue-500"><Link to="/registrasi">Registrasi</Link></a>
                            ) : (
                                <p></p>
                            )}
                        </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}

export default Races;
