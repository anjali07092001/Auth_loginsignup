import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations
    if (!loginCredentials.email || !loginCredentials.password) {
      toast.error('Both email and password are required.');
      return;
    }

    if (loginCredentials.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Login successful! Redirecting...');

        // ✅ Store token
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // ✅ Store user (must use `username`, not `name`)
        if (data.user && data.user.username) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        // Redirect to home after delay
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        toast.error(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      console.error('Login error:', error);
    }

    // Clear the form
    setLoginCredentials({
      email: '',
      password: '',
    });
  };

  return (
    <div className='Container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            autoFocus
            placeholder='Enter your email...'
            value={loginCredentials.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={loginCredentials.password}
          />
        </div>
        <button type='submit'>Login</button>
        <span>
          Don't have an account?
          <Link to='/signup'> Sign up</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
