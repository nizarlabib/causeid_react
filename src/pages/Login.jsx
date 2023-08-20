import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import backend from '../api/backend';

const Login = () => {
    
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);
      
            const response = await backend.post('/auth/login', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Accept' : 'application/json'
              },
            });
            setError(response.data.message);
            localStorage.setItem("token", response.data.data.access_token);
            navigate('/dashboard');
    
        } catch (error) {
          setError('Invalid username or password');
        }
    };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">

        <div className="bg-white p-8 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" required>Username</label>
                    <input type="text" name="username" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
        />
        
        <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => 
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" className="mt-1 p-2 w-full border rounded-md" required {...field}/>
            </div>
            }
        />
        <p className='mb-4 text-red-500'>{error}</p>
        <button type="submit" className="w-full bg-black text-white py-2 rounded">Login</button>
        </form>
        <button href="signup.php" className="my-3 w-full bg-gray-500 text-white py-2 rounded"><Link to="/signup">SignUp</Link></button>
        </div>
    </div>
  )
}

export default Login