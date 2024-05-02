import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:8000/api/login",
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          setEmail("");
          setPassword("");
          navigate("/home");
        }
        else {
            console.log('Unauthorized')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="flex items-center justify-center h-screen bg-slate-50">
      <div className="form-contain bg-white flex justify-center flex-col m-2 p-5 h-[370px] w-[350px] gap-4 rounded-md">
        <h1 className="text-3xl font-semibold">Log In</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
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
            Sign In
          </button>
        </form>
        <Link to='/forgotpassword' className="text-blue-600 font-semibold">
          Forgot Password?
        </Link>
        <p className="text-medium ">
          Don't Have an account?
          <Link to="/register" className="text-blue-600 font-semibold mx-2">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
