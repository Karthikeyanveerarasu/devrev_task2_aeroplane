import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "../Components/AppBar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios'
export default function Content() {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
const[planenum,Setplanenum]=useState('');
const[planetime,Setplanetime]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showTable, setShowTable] = useState(false);
    const [bookingData, setBookingData] = useState([]);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
  const handleaddplane =()=>{
    if(planenum=="" || planetime==""){
      toast.error("enter valid data", {
        position: "top-right",
        theme: "dark"
      });
    }
    else{
      console.log(planenum,planetime);
       axios.post("http://localhost:3002/plane",{
        plane_no:planenum,
        plane_time:planetime
       }).then(res=>{
    if(res.data.already){
      toast.error(res.data.already, {
        position: "top-right",
        theme: "dark"
      });
    }
    else if(res.data.success){
      
      toast.success(res.data.success, {
        position: "top-right",
        theme: "dark"
      });
      handleClose();
    }
     })
    }
   
    }

    const handledeleteplane =()=>{
      if(planenum==""){
        toast.error("enter valid data", {
          position: "top-right",
          theme: "dark"
        });
      }
      else{
        console.log(planenum,planetime);
         axios.post("http://localhost:3002/deleteplane",{
          plane_no:planenum
         }).then(res=>{
      if(res.data.delete){
        toast.warning(res.data.delete, {
          position: "top-right",
          theme: "dark"
        });
        handleClose1();
      }
      else if(res.data.noplane){       
        toast.error(res.data.noplane, {
          position: "top-right",
          theme: "dark"
        });
        
      }
       })
      }
      }
     const handlealldata =async()=>{
      try {
        const response = await axios.post("http://localhost:3002/alldata")
        console.log(response.data);
        setBookingData(response.data);
        setShowTable(true);
        if(bookingData.length<=0){
          alert
        }t(""
      } catch (error) {
        console.error(error);
      }
      }
    return (
        <>
        <ToastContainer />
        <div class="addplane">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD PLANE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="number" class="form-control" placeholder="plane number" onChange={(e)=>Setplanenum(e.target.value)}  />
           <br />
            <div>
          <input type="time" className="form-control" onChange={(e)=>Setplanetime(e.target.value)}/>
            </div>
            <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleaddplane}>
            Add Plane
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
        
       <div>
       <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>REMOVE PLANE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="number" class="form-control" placeholder="plane number" onChange={(e)=>Setplanenum(e.target.value)}  />
            <br />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="danger" onClick={handledeleteplane}>
            delete Plane
          </Button>
        </Modal.Footer>
      </Modal>
       </div>
            <div className="container">
                <div>
                    <div className="header_content flex flex-c text-center text-white">
                        <div class="mt-5">
                            <h2 className="header_title text-capitalize">
                            Life is a journey, enjoy the flight 
                            </h2>
                        </div>
                        <br />
                        <div class="mt-1 mx-2">
                            <button class="btn rounded btn-info" onClick={handleShow}>

                                Add a plane
                            </button>
                            <button class="btn rounded btn-info mx-2" onClick={handleShow1}>
                                remove a plane
                            </button>
                            <button class="btn rounded btn-info " onClick={handlealldata}>
                               view all bookings
                            </button>
                        </div>
                        <div className="mt-5">
                          
                        </div>
                    </div>
                </div>
                </div>
                <div class="container">
                {showTable && (
              <div className="mt-5">
                <table className="table">
                  <thead>
                    <tr>
                    <th scope="col">email</th>
                    <th>name</th>
                    <th>phone</th>
                      <th>plane_num</th>
                      <th>plane_time</th>
                      <th>number of tickets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData.length > 0 ? (
                      bookingData.map((booking) => (
                        <tr key={booking.id}>
                          <td scope="row">{booking.email}</td>
                          <td>{booking.name}</td>
                          <td>{booking.phone}</td>
                          <td>{booking.planeno}</td>
                          <td>{booking.planetime}</td>
                          <td>{booking.ticket}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="mt-4">
                        <td colSpan="3">No booking data available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
                </div>
            </>
            )
}