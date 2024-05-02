import React from "react";
import { useState } from "react";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        { username, email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert('registration sucess')
        setUsername('')
        setEmail('')
        setPassword('')
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-slate-50">
      <div className="form-contain bg-white flex justify-center flex-col m-2 p-5 h-[420px] w-[350px] gap-5 rounded-md">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="h-12 border p-2 rounded-sm border-gray-400  focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="h-12 border p-2 rounded-sm border-gray-400  focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="h-12 border p-2 rounded-sm border-gray-400  focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="py-2 bg-blue-600 font-bold text-xl text-white rounded-sm"
          >
            Create Account
          </button>
        </form>
        
        <p className="text-medium text-center">
          Already Have an account? 
          
          <Link to='/' className="text-blue-600 font-semibold mx-2">Sign In</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
