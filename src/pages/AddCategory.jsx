import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
 const { axiosInstance } = useContext(UserContext);
 const submitForm = (e) => {
  e.preventDefault();
  const data = {
   name: e.target.name.value,
  };
  axiosInstance
   .post("/add_category/", data)
   .then((res) => {
    toast.success("Category added successfully!", { position: "top-center" });
    console.log(res);
   })
   .catch((error) => {
    toast.error("Failed to add category. Please try again.", {
     position: "top-center",
    });
    console.error(error);
   });
 };

 return (
  <div className="flex items-center justify-center bg-black min-h-screen text-white">
   <form action="" onSubmit={submitForm} className="flex flex-col bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>
    <label htmlFor="name" className="mb-2 font-medium">Category Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter category name" className="p-3 mb-4 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <button type="submit" className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 text-white font-semibold">Submit</button>
   </form>
   <ToastContainer />
  </div>
 );
};

export default AddCategory;