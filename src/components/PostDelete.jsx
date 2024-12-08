import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const PostDelete = ({ slug }) => {
 const navigate = useNavigate();
 const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;
  try {
   const response = await axios.delete(`https://backend-e4ds.onrender.com/${slug}/post_delete`);
   toast.success("Post deleted successfully! Redirecting to Main Page", { position: "top-center" });
   setTimeout(() => {
    navigate("/");
   }, 2500);
  } catch (error) {
   console.error("Failed to delete post:", error);
   toast.error("Failed to delete post. Try again later.", {
     position: "top-center",
   });
  }
 };

 return (
  <div className="w-[20%]"> 
   <button type='button' onClick={handleDelete} className="p-3 bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 text-white font-semibold w-[100%]">Delete</button>
   <ToastContainer/>
  </div>
 );
}

export default PostDelete;