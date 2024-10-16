import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/UserContext';

const apiUrl = import.meta.env.VITE_API_URL;

export default function SignUp() {
  const {user, login} = useUserContext();
    const navigate = useNavigate();
    console.log(user);
    if(user.isAuthenticated){
        navigate('/');
    }
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        login({ id:data.user.id, name:data.user.name, email:data.user.email})
        navigate('/');
        return;
      }else{
        throw new Error(data.message || "server error");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setTimeout(() =>{
        setError(null);
      },2000)
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='name'
          className='border p-3 rounded-lg'
          id='name'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
