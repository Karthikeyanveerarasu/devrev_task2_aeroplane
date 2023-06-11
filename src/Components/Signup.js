import { FloatingLabel, Form, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import './Login.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import React from "react";
import OtpInput from "react-otp-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Load from "../loader/Load";
function MyVerticallyCenteredModal(props) {
  const [buttonname, SetButton] = useState("verify");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [spinner, SetSpinner] = useState(false);
  function change(e) {
    e.preventDefault();
    if (otp == "") {
      toast.error("Invalid OTP !", {
        position: "top-right",
        theme: "dark"
      });
    } else {
      SetButton("Verifying...");
      SetSpinner(true);

      setTimeout(() => {
       console.log(props.otpgen)
        if (otp == props.otpgen) {
          axios.post('http://localhost:3002/register',{email: props.email,
            password:props.pass,
            number:props.phone,
            name:props.name}).then((response)=>{
            if(response.data.success){
              toast.success(response.data.success,{
                position: "top-right",
                theme: "dark",
                autoClose: 2000
              });
            }
          })
         
          setTimeout(() => {
            props.onHide();
            navigate("/");
          }, [2000]);
        } else {
          toast.error("Invalid OTP !", {
            position: "top-right",
            theme: "dark"
          });
          SetButton("verify");
          SetSpinner(false);
        }
        SetButton("verify");
        SetSpinner(false);
      }, 2000);
    }
  }
  function resender(){
    axios.post('http://localhost:3002/mobile',{email : props.email}).then((response)=>{
        if(response.data.otp){
          toast.info('OTP resent successfully !',{
            position: "top-right",
            theme: "dark"
          })
 props.Setotpgen(response.data.otp);
        }
       })
  }
  return (
    <>
      <ToastContainer />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div class="container height-100 d-flex justify-content-center align-items-center">
            <div class="position-relative">
              <div class=" p-3 text-center">
                <div class="text-center  content d-flex justify-content-center align-items-center">
                  <h5 class="text-center">Email Verification</h5>
                </div>
                <h6 class="mt-3">
                  Please enter the one time password to verify your account
                </h6>
                <div>
                  {" "}
                  <strong class="mt-3">
                    A code has been sent to &nbsp;
                    <small>{props.email}</small>{" "}
                  </strong>
                </div>
                <div class="text-center mt-3 content d-flex justify-content-center align-items-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            <div>
              <button class="btn btn-warning px-4 " onClick={change}>
                <strong>{buttonname}</strong>&nbsp;
                {spinner && (
                  <div
                    class="spinner-border spinner-border-sm "
                    role="status"
                  ></div>
                )}
              </button>{" "}
            </div>
            <div class="card-2 mt-3">
              <div class="content d-flex justify-content-center align-items-center">
                <span>Didn't get the code</span>
                <a
                  href="#"
                  class="text-decoration-none ms-3"
                 onClick={resender}
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [pass, SetPass] = useState("");
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, Setphone] = useState("");
  const [otpgen, Setotpgen] = useState("");
  
  axios.defaults.withCredentials = true;
  const Register = (e) => {
    e.preventDefault();
    let num = /[0-9]/;
    let u = /^[A-Za-z\s]*$/g;
    let regex = /[^((0-9)|(a-z)|(A-Z)|\s)]/g;

    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "" || pass === "") {
      toast.error("Fill all the data", {
        position: "top-right",
        theme: "dark"
      });
    } else if (!res.test(email)) {
      toast.error("Enter a valid Email !", {
        position: "top-right",
        theme: "dark"
      });
    } else if (pass.length < 8) {
      toast.error("Password must greater than 8 character", {
        position: "top-right",
        theme: "dark"
      });
    } else if (u.test(phone) || phone.length < 10 || phone.length > 12) {
      toast.error("Enter a valid number !", {
        position: "top-right",
        theme: "dark"
      });
    } else if (!num.test(pass)) {
      toast.error("Password must contain atleast one number", {
        position: "top-right",
        theme: "dark"
      });
    } else if (!regex.test(pass)) {
      toast.error("Password must contain atleast one special character", {
        position: "top-right",
        theme: "dark"
      });
    } else {
      axios.post('http://localhost:3002/mobile',{email : email , number:phone }).then((response)=>{
        if(response.data.otp){
  Setotpgen(response.data.otp);
  setModalShow(true);
        }
        if(response.data.already){
          toast.error(response.data.already, {
            position: "top-right",
            theme: "dark"
          });
        }
       })
      
    };
  };
  const [modalShow, setModalShow] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);
  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        email={email}
        name={name}
        pass={pass}
        phone={phone}
        Setotpgen={Setotpgen}
        otpgen={otpgen}
        onHide={() => setModalShow(false)}
      />
      <section>
        {isPageLoading ? (
          <div class="load_component">
         <Load />
          </div>
        ) : (
          <div class="register-box ">
            <div class="form-value">
              <form action="">
                <h2>REGISTER</h2>
                <div class="inputbox">
                  <ion-icon name="mail-outline"></ion-icon>
                  <input
                    type="text"
                    required
                    onChange={(e) => SetEmail(e.target.value)}
                  />
                  <label for="">Email</label>
                </div>
                <div class="inputbox">
                  <ion-icon name="mail-outline"></ion-icon>
                  <input
                    type="text"
                    required
                    onChange={(e) => SetName(e.target.value)}
                  />
                  <label for="">Name</label>
                </div>
                <div class="inputbox">
                  <ion-icon name="mail-outline"></ion-icon>
                  <input
                    type="text"
                    required
                    onChange={(e) => Setphone(e.target.value)}
                  />
                  <label for="">Phone number</label>
                </div>
                <div class="inputbox">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <input
                    type="password"
                    required
                    onChange={(e) => SetPass(e.target.value)}
                  />
                  <label for="">Password</label>
                </div>

                <button class="login_btn" onClick={Register}>
                  Sign up
                </button>
                <div class="register">
                  <p class="down_link" onClick={() => navigate("/")}>
                    Already Member ? Login Now
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}