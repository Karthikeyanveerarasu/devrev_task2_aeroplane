import React, { useEffect, useState } from "react";
import Load from "../loader/Load";
import './Login.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "./AppBar";
import Content from "./Content";
export default function Home() {
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
          <AppBar />
          <Content />
        </>
      )}
    </>
  );
}