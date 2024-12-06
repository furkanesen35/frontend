import React, { useState, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import 'react-toastify/dist/ReactToastify.css';

const Post = () => {
 const { userToken, axiosInstance } = useContext(UserContext);
 const [categories, setCategories] = useState([]);
 const [imageFile, setImageFile] = useState(null);

 function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
 }

 const csrftoken = getCookie('csrftoken');
 
 const headers = {
  'X-CSRFToken': csrftoken,
  Authorization : `Bearer ${userToken}`,
 };

 useEffect(() => {
  axiosInstance.get('/get_category/')
   .then(response => {
    setCategories(response.data);
   })
   .catch(error => {
    console.error('Error fetching categories:', error);
    toast.error('Failed to fetch categories', { position: 'top-center' });
   });
 },[]);

 const submitForm = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', e.target.title.value);
  formData.append('content', e.target.content.value);
  formData.append('status', e.target.status.value);
  formData.append('category', e.target.category.value);
  formData.append('image', imageFile);

  try {
   const response = await axiosInstance.post('/post/add/', formData);
   console.log(response.data);
   toast.success('Post created successfully!', { position: 'top-center' });
  } catch (error) {
   console.error('Error submitting post:', error.response?.data || error.message);
   toast.error('Failed to create post', { position: 'top-center' });
  }
 };

 const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
 };

 return (
  <div className="flex flex-col justify-center items-center bg-black h-[100vh] text-white px-4">
   <div className="mb-8 text-center text-2xl font-semibold">You can Post your Pictures!</div>
   <ToastContainer />
   <form className="flex flex-col bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md" action="" method="POST" onSubmit={submitForm} encType="multipart/form-data">
    <label htmlFor="title" className="mb-2 font-medium">Title</label>
    <input type="text" name="title" id="title" className="mb-4 p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <label htmlFor="content" className="mb-2 font-medium">Description</label>
    <textarea name="content" id="content" cols="30" rows="5" className="mb-4 p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <label htmlFor="image" className="mb-2 font-medium">Image</label>
    <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} className="mb-4 p-2 bg-gray-700 text-gray-400 rounded-lg"/>
    <label htmlFor="status" className="mb-2 font-medium">Status</label>
    <select name="status" id="status" className="mb-4 p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
     <option value="d" className="text-black">Draft</option>
     <option value="p" className="text-black">Published</option>
    </select>
    <label htmlFor="category" className="mb-2 font-medium">Category</label>
    <select name="category" id="category" className="mb-4 p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
     {categories.map((category, index) => (<option key={index} value={category.id} className="text-black">{category.name}</option>))}
    </select>
    <button type="submit" className="mt-4 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300">Submit</button>
   </form>
  </div>
 );
};

export default Post;
