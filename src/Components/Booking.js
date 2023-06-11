import axios from "axios";
import { useEffect, useState } from "react";
import AppBar from './AppBar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Booking() {
  const [email, setEmail] = useState("");
  const [bookingData, setBookingData] = useState([]);

  const validate = async (e) => {
    e.preventDefault();
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "") {
      toast.error("Fill the data", {
        position: "top-right",
        theme: "dark"
      });
    } else if (!res.test(email)) {
      toast.error("Enter a valid Email !", {
        position: "top-right",
        theme: "dark"
      });
    } else {
      try {
        const response = await axios.post("http://localhost:3002/booking", {
          email: email
        });
        console.log(response.data);
        setBookingData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <AppBar />
      <ToastContainer />
      <div className="container">
        <div className="text-center mt-5">
          <h3 className="display-6">Booking Details</h3>
          <br />
          <div style={{ width: "50%", margin: "auto" }}>
            <input
              type="text"
              placeholder="booked email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-info mt-3" onClick={validate}>verify</button>
          </div>
        </div>
        <table className="table table-hover table-dark w-50 mt-5" style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th scope="col">plane_num</th>
              <th scope="col">plane_time</th>
              <th scope="col">number of tickets</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.length > 0 ? (
              bookingData.map((booking) => (
                <tr key={booking.id}>
                  <td scope="row">{booking.planeno}</td>
                  <td>{booking.planetime}</td>
                  <td>{booking.ticket}</td>

                </tr>
              ))
            ) : (
              <tr class="mt-4">
                <td colSpan="3">No booking data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
