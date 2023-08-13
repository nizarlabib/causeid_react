import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Races = () => {
    const [raceData, setRaceData] = useState(null);
    const [userid, setUserId] = useState('');
    const [raceid, setRaceId] = useState('');
    const [jerseysize, setJerseySize] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleRaceIdChange = (e) => {
    setRaceId(e.target.value);
  };
  
  const handleJerseySizeChange = (e) => {
    setJerseySize(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append('user_id', '1');
        formData.append('race_id', '2');
        formData.append('registration_jerseysize', jerseysize);
  
        const response = axios.post('http://127.0.0.1:8000/user/races/join', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/races');
    } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred. Please try again later.');
        }
        console.error(error);
      }
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/races/id/1')
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
                    <th class="px-4 py-2">Race Activity Start</th>
                    <th class="px-4 py-2">Race Activity End</th>
                    <th class="px-4 py-2">Race Description</th>
                    <th class="px-4 py-2">Race Finish Kilometers</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr>
                        <td class="px-4 py-2">{raceData.race_name}</td>
                        <td class="px-4 py-2">{raceData.race_picture}</td>
                        <td class="px-4 py-2">{raceData.race_startdatetime}</td>
                        <td class="px-4 py-2">{raceData.race_enddatetime}</td>
                        <td class="px-4 py-2">{raceData.race_activitystartdatetime}</td>
                        <td class="px-4 py-2">{raceData.race_activityenddatetime}</td>
                        <td class="px-4 py-2">{raceData.race_description}</td>
                        <td class="px-4 py-2">{raceData.race_finishkilometer}</td>
                        <td class="px-4 py-2">{raceData.status}</td>
                    </tr>
                </tbody>
            </table>
    </div>
    )}
    <div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            <h2 class="text-2xl mb-4">Registrasi Race</h2>
            <form onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Nama</label>
                    <input type="text" name="name" class="mt-1 p-2 w-full border rounded-md" value="nizar"/>
                    <input type="hidden" name="name" class="mt-1 p-2 w-full border rounded-md" value="1"/>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Race</label>
                    <input type="text" name="race" class="mt-1 p-2 w-full border rounded-md" value={jerseysize} onChange={handleJerseySizeChange} />
                    <input type="hidden" name="race" class="mt-1 p-2 w-full border rounded-md"/>
                </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Jersey Size</label>
                        <select class="form-select" id="dropdown" name="dropdown" >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="px-4 py-2 bg-black text-white rounded ">Submit</button>
                </div>
            </form>
        </div>
    </div>
    </div>
  );
}

export default Races;
