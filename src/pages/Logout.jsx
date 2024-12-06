import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
 const { logoutUser, axiosInstance } = useContext(UserContext);
 const navigate = useNavigate();

 const handleLogout = async () => {
  try {
   await axiosInstance.post("/account/api/logout/");
   logoutUser();
   toast.success("Logout successful! Redrecting to Login", { position: "top-center" });
   setTimeout(() => {
    navigate("/login");
   }, 3500);
  } catch (error) {
   console.error("Logout failed:", error);
   toast.error("Logout failed. Please try again.", { position: "top-center" });
  }
 };

 return (
  <div className="flex flex-col items-center justify-center bg-black min-h-screen text-white">
   <div className="text-center">
    <h1 className="text-3xl font-bold mb-6">Are you sure you want to logout?</h1>
    <button onClick={handleLogout} className="p-3 bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 text-white font-semibold">Logout</button>
   </div>
   <ToastContainer />
  </div>
 );
};

export default LogoutComponent;
