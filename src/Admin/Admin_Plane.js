import React, { useEffect, useState } from "react";
import Load from "../loader/Load";
import '../Components/Login.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import AdminAppBar from "./AdminAppbar";
export default function Admin(){
  const [load, setLoad] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  useEffect(() => {
    const handlealldata =async()=>{
        try {
          const response = await axios.post("http://localhost:3002/allplanedetails")
          console.log(response.data);
          setBookingData(response.data);
        } catch (error) {
          console.error(error);
        }
        }
        handlealldata();
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  return (
    <>
      <ToastContainer />
      {load ? (
        <Load />
      ) : (
        <>
          <AdminAppBar />
          <div class="container">
             <div class="text-center mt-4">
<h3 class="title">All Plane Details</h3>
             </div>
              <div className="mt-5">
                <table className="table">
                  <thead>
                    <tr>
                    <th scope="col">plane_no</th>
                    <th>plane_time</th>
                    <th>available_Tickets</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData.length > 0 ? (
                      bookingData.map((booking) => (
                        <tr key={booking.id}>
                          <td scope="row">{booking.plane_no}</td>
                          <td>{booking.planetime}</td>
                          <td>{booking.count}</td>
                         
                        </tr>
                      ))
                    ) : (
                      <tr className="mt-4">
                        <td colSpan="3">No data available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
        
                </div>
        </>
      )}
    </>
  );

}