import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
 const navigate = useNavigate();
 const submitForm = async (e) => {
  e.preventDefault();
  const data = {
   username: e.target.username.value,
   password: e.target.password.value,
   email: e.target.email.value,
  };
  try {
   const response = await axios.post("https://backend-e4ds.onrender.com/account/register/", data);
   toast.success("Registration successful!. Redirecting to Login Page", { position: "top-center" });
   setTimeout(() => {
    navigate("/login");
   }, 3500);
  } catch (error) {
   toast.error("Registration failed. Please try again.", {
    position: "top-center",
   });
  }
 };
 return (
  <div className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen text-white">
   <h1 className="text-3xl font-bold mb-8">Register</h1>
   <form action="" onSubmit={submitForm} className="flex flex-col bg-gray-700 p-8 rounded-lg shadow-lg w-[90%] max-w-md">
    <input type="text" name="username" placeholder="Username" className="p-3 mb-4 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <input type="email" name="email" placeholder="Email" className="p-3 mb-4 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <input type="password" name="password" placeholder="Password" className="p-3 mb-6 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <button type="submit" className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 text-white font-semibold">Submit</button>
   </form>
   <ToastContainer />
  </div>
 );
};

export default Register;