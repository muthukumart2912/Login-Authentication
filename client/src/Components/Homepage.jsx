import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  
  const navigate = useNavigate();


  const handleLogout = () => {
    axios
      .get("http://localhost:8000/api/logout")
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className="flex gap-5 flex-col">
      <h1>Homepage</h1>
      <button
        className="py-2 px-5 bg-blue-600 font-semibold text-white rounded-sm"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
};

export default Homepage;
