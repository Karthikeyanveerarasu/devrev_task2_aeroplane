import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Content() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[planenum,Setplanenum]=useState('');
const[planetime,Setplanetime]=useState('');
const[name,Setname]=useState('');
const[email,SetEmail]=useState('');
const[phone,Setphone]=useState('');
const[ticketcount,Setticketcount]=useState('');
const hangleticket =()=>{
 if(name=="" || phone=="" || planenum=="" || planetime=="" || ticketcount==""){
    toast.error("enter valid datd", {
        position: "top-right",
        theme: "dark"
      });
 }
 else{
    axios.post("http://localhost:3002/book",{
        plane_no:planenum,
        plane_time:planetime,
        name:name,
        phone:phone,
        ticket:ticketcount,
        email:email
       }).then(res=>{
if(res.data.no){
    toast.error(res.data.no, {
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
    return (
        <>
         <ToastContainer />
        <div class="addplane">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>BOOKING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center">
            <input type="text" class="form-control" value={name} placeholder="your name" onChange={(e)=>Setname(e.target.value)}  />
<br />
<input type="text" class="form-control" placeholder="your email" onChange={(e)=>SetEmail(e.target.value)}  />
<br />
<input type="number" class="form-control" placeholder="phone" onChange={(e)=>Setphone(e.target.value)}  />
<br />
            <input type="number" class="form-control" placeholder="plane number" onChange={(e)=>Setplanenum(e.target.value)}  />
<br />
<div>
          <input type="time" className="form-control" onChange={(e)=>Setplanetime(e.target.value)}/>
            </div>
            <br />
            <div>
          <input type="number" className="form-control" placeholder="how many tickets needed" onChange={(e)=>Setticketcount(e.target.value)}/>
            </div>

            </div>
           <br />
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={hangleticket}>
            book now
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
                        <div class="mt-1">
                            <button class="btn rounded btn-info" onClick={handleShow}>
                                Book a Ticket
                            </button>
                        </div>
                        <div className="mt-5">
                          
                        </div>
                    </div>
                </div>
                </div>
            </>
            )
}