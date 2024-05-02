import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";


const Resetpass = () => {
  const [password, setPassword] = useState("");
  const {token} = useParams();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:8000/api/resetpassword/"+token,
        { password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
            alert('password changed successfully')
          navigate("/");
          console.log(response.data);
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="flex items-center justify-center h-screen bg-slate-50">
      <div className="form-contain bg-white flex justify-center flex-col m-2 p-5 h-[250px] w-[350px] gap-4 rounded-md">
        <h1 className="text-3xl font-semibold">Enter your new password</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="h-12 border p-2 rounded-sm border-gray-400  focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="py-2 bg-blue-600 font-bold text-xl text-white rounded-sm"
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default Resetpass;
