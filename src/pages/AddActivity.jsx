import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import backend from '../api/backend';
import Navbar from '../components/Navbar';

const AddActivity = () => {
    const { control, register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [dataRaces, setDataRaces] = useState([]);
    const [dataUser, setDataUser] = useState(null);
    const [file, setFile] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }; 

    useEffect(() => {

        if (!token) {
            navigate('/login');
        }
        const fetchData = async () => {
          try {
    
            const raceResponse = await backend.get('/races/user/races', {
              headers: headers,
            });
            setDataRaces(raceResponse.data.data.races);
            setDataUser(raceResponse.data.data.user);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [token]);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('activity_name', data.name);
            // formData.append("fileupload", data.target.files[0]);
            formData.append('activity_type', data.type);
            formData.append('activity_kilometers', data.kilometers);
            formData.append('activity_hours', data.hours);
            formData.append('activity_minutes', data.minutes);
            formData.append('activity_seconds', data.seconds);
            formData.append('activity_datetime', data.datetime);
            formData.append('race_ids', data.idrace);
            formData.append('user_id', dataUser.id);
      
            const responseActivities = await backend.post('/activities/create', formData, {
              headers: headers,
            });
            navigate('/activities');
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  return (
    <div>
        <Navbar />
        <div className="bg-gray-100 flex items-center justify-center">
        <div className="bg-white my-5 p-8 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-4">Add Activity</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            {dataRaces && (
                <Controller
                name="idrace"
                control={control}
                defaultValue=""
                render={({ field }) => 
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Race</label>
                    <select name="idrace" id="" {...field}>
                        <option name="idrace">-</option>  
                        {dataRaces.map((races, index) => (
                            <option name="idrace" key={index}>{races.id}</option>  
                        ))}
                    </select>      
                </div>
                }
                />
            )}
            <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Name</label>
                <input type="text" name="name" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
                
            </div>
            }
            />
            <Controller
            name="picture"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Picture</label>
                {/* <input type="text" name="name" className="mt-1 p-2 w-full border rounded-md" required {...field}/> */}
            </div>
            }
            />
            <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Type</label>
                <input type="text" name="type" className="mt-1 p-2 w-full border rounded-md" requuired {...field}/>
            </div>
            }
            />
            <Controller
            name="kilometers"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Kilometers</label>
                <input type="number" name="kilometers" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
            />
            <Controller
            name="hours"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Hours</label>
                <input type="number" name="hours" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
            />
            <Controller
            name="minutes"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Minutes</label>
                <input type="number" name="minutes" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
            />
            <Controller
            name="seconds"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Seconds</label>
                <input type="number" name="seconds" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
            />
            
            <Controller
            name="datetime"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Datetime</label>
                <input type="date" name="datetime" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
            />
            <button type="submit" className="w-full bg-black text-white py-2 rounded">Submit</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default AddActivity;