import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Forgotpass from "./Components/Forgotpass";
import Resetpass from "./Components/Resetpass";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/forgotpassword" element={<Forgotpass />} />
        <Route path="/resetpass/:token" element={<Resetpass />} />
      </Routes>
    </>
  );
}

export default App;
