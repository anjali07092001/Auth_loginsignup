import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Home Component
 * Displays a welcome message and logout button.
 * Fetches the username from localStorage (set during signup or login).
 */
function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Guest');
  // Fetch username from localStorage singup
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUsername(user.name);
    }
  }, []);

  // ✅ Correct: Fetch username from localStorage login
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.username) {
    setUsername(user.username);
  }
}, []);


  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from storage
    navigate('/login');             // Redirect to login page
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='rounded-lg bg-white p-8 text-center shadow-lg'>
        <h1 className='mb-4 text-4xl font-extrabold text-indigo-700'>
          Welcome, {username}!
        </h1>
        <p className='mb-6 text-xl text-gray-700'>
          You have successfully signed up and are now logged in.
        </p>
        <button
          onClick={handleLogout}
          className='rounded bg-red-500 px-6 py-3 text-white hover:bg-red-600 transition duration-300'
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
