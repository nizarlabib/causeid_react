import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import backend from '../api/backend';
import Navbar from '../components/Navbar';


const Races = () => {
    const [dataRace, setDataRace] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm();
    const { id } = useParams();
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
  
          const raceResponse = await backend.get(`/races/${id}`, {
            headers: headers,
          });
          setDataRace(raceResponse.data.data);
  
          const progresResponse = await backend.get('/auth/me', {
            headers: headers,
          });
          setDataUser(progresResponse.data.data);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [token]);

    const onSubmit = async (data) => {
      try {
          const formData = new FormData();
          formData.append('user_id', dataUser.id);
          formData.append('race_id', dataRace.id);
          formData.append('registration_jerseysize', data.jersey);
    
          const response = await backend.post('/races/user/joinrace', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : `Bearer ${token}`,
            },
          });
          console.log(response.data.message);
          navigate('/races');
  
      } catch (error) {
      }
  };

  return (
    
    <div>
      <Navbar />
          {dataRace && (
    <div>
        <table className="table-auto w-full mt-5">
                <thead>
                    <tr>
                    <th className="px-4 py-2">Race Name</th>
                    <th className="px-4 py-2">Race Picture</th>
                    <th className="px-4 py-2">Race Start</th>
                    <th className="px-4 py-2">Race End</th>
                    <th className="px-4 py-2">Race Activity Start</th>
                    <th className="px-4 py-2">Race Activity End</th>
                    <th className="px-4 py-2">Race Description</th>
                    <th className="px-4 py-2">Race Finish Kilometers</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td className="px-4 py-2">{dataRace.race_name}</td>
                        <td className="px-4 py-2">{dataRace.race_picture}</td>
                        <td className="px-4 py-2">{dataRace.race_startdatetime}</td>
                        <td className="px-4 py-2">{dataRace.race_enddatetime}</td>
                        <td className="px-4 py-2">{dataRace.race_activitystartdatetime}</td>
                        <td className="px-4 py-2">{dataRace.race_activityenddatetime}</td>
                        <td className="px-4 py-2">{dataRace.race_description}</td>
                        <td className="px-4 py-2">{dataRace.race_finishkilometer}</td>
                        <td className="px-4 py-2">{dataRace.status}</td>
                    </tr>
                </tbody>
            </table>
    </div>
    )}
    <div className="bg-gray-100 p-8 h-screen">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Registrasi Race</h2>
            {dataRace && dataUser && (
            <form onSubmit={handleSubmit(onSubmit)}>
            
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <p>{dataUser.username}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <p>{dataUser.user_firstname}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <p>{dataUser.user_lastname}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Race</label>
                    <p>{dataRace.race_name}</p>
                </div>
                
                <Controller
                name="jersey"
                control={control}
                defaultValue=""
                render={({ field }) => 
                  <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" required>Jersey Size</label>
                        <select name="jersey" id="" {...field}>
                            <option name="S">S</option>  
                            <option name="M">M</option>  
                            <option name="L">L</option>  
                        </select>      
                    </div>
                }
            />
            
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 rounded bg-black text-white">Submit</button>
                </div>
            </form>
            )}
        </div>
    </div>
    </div>
  );
}

export default Races;
