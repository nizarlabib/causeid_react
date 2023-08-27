import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backend from '../api/backend';
import Navbar from '../components/Navbar';

const Activities = () => {
  const [dataActivities, setDataActivities] = useState(null);
  const navigate = useNavigate();
  // const token = localStorage.getItem("token"); 
  const token = useSelector(state => state.token);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }; 

  useEffect(() => {
    if (token==null) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {

        const raceResponse = await backend.get('/activities', {
          headers: headers,
        });
        setDataActivities(raceResponse.data.data.activities);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await backend.post(`/activities/delete/${id}`,{},{
        headers: headers
      });
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    
    <div>
      <Navbar />
        <div>
          <button href="#" className="my-5 ml-5 bg-green-500 mt-20 text-white p-2 rounded"><Link to={'/add-activity'}>+ Add Activity</Link></button>
            <table className="table-fixed mx-5 w-full text-sm text-center">
                <thead>
                    <tr className='sm:table-row max-w-lg'>
                    <th className="border border-gray-400 px-4 py-2">No</th>
                    <th className="border border-gray-400 px-4 py-2">Activity Name</th>
                    <th className="border border-gray-400 px-4 py-2">Race</th>
                    <th className="border border-gray-400 px-4 py-2">Activity Picture</th>
                    <th className="border border-gray-400 px-4 py-2">Activity Type</th>
                    <th className="border border-gray-400 px-4 py-2">Activity Kilometers</th>
                    <th className="border border-gray-400 px-4 py-2">Activity Hours</th>
                    <th className="border border-gray-400 px-4 py-2">Activity Minutes</th>
                    <th className="border border-gray-400 px-4 py-2">Activity Seconds</th>
                    <th className="border border-gray-400 px-4 py-2">Activity Datetime</th>
                    <th className="border border-gray-400 px-4 py-2">Action</th>
                    </tr>
                </thead>
                 {dataActivities && (
                <tbody className="text-center">
                {dataActivities.map((activities, index) => (
                        <tr className='sm:table-row'>
                        <td className="border border-gray-400 px-4 py-2">{index+1}</td>
                        <td className="border border-gray-400 px-4 py-2" key={index}>{activities.activity_name}</td>
                        <td className="border border-gray-400 px-4 py-2" key={index}>{activities.race_name}</td>
                        <td className="border border-gray-400 px-4 py-2" key={index}><img className="w-20" src={activities.activity_picture} alt="" /></td>
                        <td className="border border-gray-400 px-4 py-2" key={index}>{activities.activity_type}</td>
                        <td className="border border-gray-400 px-4 py-2" key={index}>{activities.activity_kilometers}</td>
                        <td className="border border-gray-400 px-4 py-2" key={index}>{activities.activity_hours}</td>
                        <td className="border border-gray-400 px-4 py-2" key={index}>{activities.activity_minutes}</td>
                        <td className="border border-gray-400 px-4 py-2" key={index}>{activities.activity_seconds}</td>
                        <td className="border border-gray-400 px-4 py-2" key={index}>{activities.activity_datetime}</td>
                        <td className="border border-gray-400 px-4 py-2"><button href="#" className="bg-red-600 p-2 text-white rounded" onClick={() => handleDelete(activities.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            )}
            </table>
        </div>
    </div>
  );
}

export default Activities;
