import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Activities = () => {
  const [activitiesData, setActivitiesData] = useState(null);
  const [storedUserData, setStoredUserData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/activities/1')
      .then(response => {
        setActivitiesData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    
    <div>
      {activitiesData && (
        <div>
            <table class="table-auto w-full mt-5">
                <thead>
                    <tr>
                    <th class="px-4 py-2">Activity Name</th>
                    <th class="px-4 py-2">Activity Picture</th>
                    <th class="px-4 py-2">Activity Type</th>
                    <th class="px-4 py-2">Activity Kilometers</th>
                    <th class="px-4 py-2">Activity Hours</th>
                    <th class="px-4 py-2">Activity Minutes</th>
                    <th class="px-4 py-2">Activity Seconds</th>
                    <th class="px-4 py-2">Activity Datetime</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                {activitiesData.map((activities, index) => (
                        <tr>
                        <td class="px-4 py-2" key={index}>{activities.activity_name}</td>
                        <td class="px-4 py-2" key={index}>{activities.activity_picture}</td>
                        <td class="px-4 py-2" key={index}>{activities.activity_type}</td>
                        <td class="px-4 py-2" key={index}>{activities.activity_kilometers}</td>
                        <td class="px-4 py-2" key={index}>{activities.activity_hours}</td>
                        <td class="px-4 py-2" key={index}>{activities.activity_minutes}</td>
                        <td class="px-4 py-2" key={index}>{activities.activity_seconds}</td>
                        <td class="px-4 py-2" key={index}>{activities.activity_datetime}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
