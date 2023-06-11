import React, { useEffect, useState } from "react";
import Load from "../loader/Load";
import '../Components/Login.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "../Components/AppBar";
import Admin_content from './Admin_content'
import AdminAppBar from "./AdminAppbar";
export default function Admin(){
  const [load, setLoad] = useState(true);
  useEffect(() => {
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
          <Admin_content />
        </>
      )}
    </>
  );

}