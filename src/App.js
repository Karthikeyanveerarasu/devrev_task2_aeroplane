import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Hone from "./Components/Home";
import Admin_Plane from './Admin/Admin_Plane'
import Booking from "./Components/Booking";
import Admin from "./Admin/Admin";
export default function App() {
  return (
    <div>
     
     <BrowserRouter>
     <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/reg" element={<Signup />} />
      <Route exact path="/home" element={<Hone />} />
      <Route exact path="/mybooking" element={<Booking />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route exact path="/allplanes" element={<Admin_Plane />} />

     </Routes>
     </BrowserRouter>
     
    </div>
  );
}
