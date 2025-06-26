import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginInfo.name || !loginInfo.email || !loginInfo.password) {
      toast.error('All fields are required. Please fill them out!');
      return;
    }

    if (loginInfo.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    console.log('Frontend: Data being sent for signup:', loginInfo);

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store username in localStorage
        localStorage.setItem('user', JSON.stringify({ name: loginInfo.name }));

        toast.success(data.message || 'Signup successful! Redirecting...');

        // ✅ Redirect to Home page after 2 seconds
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        toast.error(data.message || 'Signup failed. Please try again.');
        console.error('Signup failed:', data);
      }
    } catch (error) {
      console.error('Error during signup API call:', error);
      toast.error('An error occurred. Please check your network connection and try again.');
    }

    // Clear form fields
    setLoginInfo({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className='Container'>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value={loginInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='abc@gmail.com'
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password (min 8 chars)...'
            value={loginInfo.password}
          />
        </div>
        <button type='submit'>Signup</button>
        <span>
          Already have an account?
          <Link to='/login'> Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
