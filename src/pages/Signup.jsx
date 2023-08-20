import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import backend from '../api/backend';

const Signup = () => {
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('user_firstname', data.firstname);
            formData.append('user_lastname', data.lastname);
            formData.append('password', data.password);
      
            const response = await backend.post('/auth/register', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data.message);
            navigate('/login');
    
        } catch (error) {
            // setError('Username already used');
            console.log()
        }
    };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-4">SignUp</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" name="username" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
            />
            <Controller
            name="firstname"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" name="firstname" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
            />
            <Controller
            name="lastname"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" name="lastname" className="mt-1 p-2 w-full border rounded-md" requuired {...field}/>
            </div>
            }
            />
            <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="user_password" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
            />
            <button type="submit" className="w-full bg-black text-white py-2 rounded">Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Signup