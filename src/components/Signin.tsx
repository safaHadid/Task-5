import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    axios.post("https://test1.focal-x.com/api/login" , {
        email : email,
        password : password
    })
    .then(response =>{
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        localStorage.setItem("firstName", response.data.user.first_name);
        localStorage.setItem("lastName", response.data.user.last_name);
        localStorage.setItem("profileImage", response.data.user.profile_image);
        navigate("/");
    })
    .catch(error => console.log(error))

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center m-0 p-0"
      style={{
        background: 'linear-gradient(71.17deg, #FEAF00 19.35%, #F8D442 90.12%)',
      }}
    >
      <div className="bg-white p-[30px] flex flex-col items-center justify-center mx-auto rounded-xl shadow-md w-full max-w-[476px]">
        <img src="/assets/Logo-1.png" alt="Logo" className="mb-8" />
        <p className="text-center text-xl font-semibold mt-3">SIGN IN</p>
        <p className="text-center text-sm font-normal text-gray-600 mt-1">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit} className="mt-5 w-full">
          <div className='flex flex-col mb-4'>
            <label className="mb-1">Email:</label>
            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FEAF00] transition duration-200"
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label className="mb-1">Password:</label>
            <input
              type="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FEAF00] transition duration-200"
            />
          </div>
          <button 
            type="submit"
            className='bg-[#FEAF00] text-white my-8 py-2 rounded-lg w-full'
          >
            Send
          </button>
        </form>
        <p className="mt-4">
          <span className="font-semibold" style={{ fontSize: '14px', lineHeight: '17.07px' }}>
            Don’t have an account? 
          </span>
          <span className="font-normal text-[#FEAF00] pl-2 hover:cursor-pointer text-sm underline" onClick={()=>navigate('/signup')}>
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
