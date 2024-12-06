import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
 const { loginUser, axiosInstance } = useContext(UserContext);
 const submitForm = (e) => {
  e.preventDefault();
  const data = {
   username: e.target.username.value,
   password: e.target.password.value,
  };
  axiosInstance
   .post("/account/api/token/", data)
   .then((res) => {
    if (res.data) {
     const token = res.data.access;
     loginUser(token);
     toast.success("Login successful!", { position: "top-center" });
    }
   })
   .catch((error) => {
    console.error(error);
    toast.error("Login failed. Please check your credentials.", {
     position: "top-center",
    });
   });
 };

 return (
  <div className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen w-full text-white">
   {/* Heading */}
   <div className="mb-8 text-center">
    <h3 className="text-2xl font-semibold">Please Login</h3>
   </div>
   <form onSubmit={submitForm} className="flex flex-col bg-gray-700 p-8 rounded-lg shadow-lg w-[90%] max-w-md">
    <input type="text" name="username" placeholder="Username" className="p-3 mb-4 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <input type="password" name="password" placeholder="Password" className="p-3 mb-6 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <button type="submit" className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 text-white font-semibold">Submit</button>
   </form>
   <ToastContainer />
  </div>
 );
};

export default Login;