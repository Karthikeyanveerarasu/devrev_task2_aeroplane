import { useState ,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css'
import Load from "../loader/Load";
export default function Login() {
  axios.defaults.withCredentials = true;
const[email,SetEmail]=useState("");
const navigate = useNavigate();
const[Password,SetPassword]=useState("");

  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
      axios.get("http://localhost:3002/login").then((response)=>{
        if(response.data.Loggedin == true){
          navigate('/home')
        }
      })
         setIsPageLoading(false);
  }, []);

function validateuser(e){
e.preventDefault();
if(email=="" || Password==""){
  toast.error("Wrong Credentials !", {
    position: "top-right",
    theme: "dark"
  });
}
else if(email=="devrev@gmail.com" && Password=="devrev"){
  toast.info("Welcome Admin!", {
    position: "top-right",
    theme: "dark"
  });
  setTimeout(() => {
    navigate('/admin')
  }, 2000);
}
else{
 
   axios.post("http://localhost:3002/login",{
    email : email,
    password : Password
   }).then((response)=>{
   if(response.data.mismatch){
    toast.error("Wrong Credentials !", {
      position: "top-right",
      theme: "dark"
    });
   }
   if(response.data.success){
    localStorage.setItem("email",email);
    toast.info("Loging in !", {
      position: "top-right",
      theme: "dark"
    });
    setTimeout(() => {
      navigate('/home')
    }, 2000);
   }

   })
}

}
  return (
    <>
    <ToastContainer />
    {isPageLoading ? (
  <div class="load_component">
  <Load />
</div>
    ):(
      <section>
      <div class="form-box">
        <div class="form-value">
          <form action="">
            <h2>LOGIN</h2>
            <div class="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="text" required  onChange={(e)=>SetEmail(e.target.value)}/>
              <label for="">Email</label>
            </div>
            <div class="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" required onChange={(e)=>SetPassword(e.target.value)}/>
              <label for="">Password</label>
            </div>

            <button class="login_btn" onClick={validateuser}>
              Log in
            </button>
            
            <div class="register">
              <p class="down_link" onClick={() => navigate("/reg")}>
                New Member ? Create One
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
    )}
     
    </>
  );
}
