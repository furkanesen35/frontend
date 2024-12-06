import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
 const { userToken, fetchProfile, profile } = useContext(UserContext);

 useEffect(() => {
  fetchProfile();
 }, [userToken]);

 const submitProfile = async (e) => {
  e.preventDefault();
  const data = {
   username: e.target.username.value,
   email: e.target.email.value,
   password: e.target.password.value,
  };

  try {
   await axios.put(`https://backend-e4ds.onrender.com/account/change_profile/${profile.id}`, data);
   toast.success("Profile updated successfully!", { position: "top-center" });
  } catch (error) {
   console.error("Error submitting profile:", error);
   toast.error("Failed to update profile. Please try again.", {
    position: "top-center",
   });
  }
 };

 return (
  <div className="flex flex-col items-center justify-center bg-black min-h-screen text-white">
   <div className="w-[90%] max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
    <form action="" method="POST" onSubmit={submitProfile} className="flex flex-col">
     <div className="mb-4">
      <label htmlFor="username" className="block font-medium mb-2">Username:</label>
      <input type="text" name="username" className="w-full p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={profile?.username || ""}/>
     </div>
     <div className="mb-4">
      <label htmlFor="email" className="block font-medium mb-2">Email:</label>
      <input type="email" name="email" className="w-full p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={profile?.email || ""}/>
     </div>
     <div className="mb-6">
      <label htmlFor="password" className="block font-medium mb-2">Password:</label>
      <input type="password" name="password" className="w-full p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter new password"/>
     </div>
     <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold">Save Changes</button>
    </form>
   </div>
   <ToastContainer/>
  </div>
 );
};

export default Profile;