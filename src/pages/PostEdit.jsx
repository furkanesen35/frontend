import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostEdit = ({ slug }) => {
 const { userToken, profile, fetchProfile } = useContext(UserContext);
 const [data, setData] = useState([]);
 const [categories, setCategories] = useState([]);
 const [imageFile, setImageFile] = useState(null);

 const csrftoken = document.cookie.match('(^|;)\\s*' + 'csrftoken' + '\\s*=\\s*([^;]+)')?.pop() || '';
 const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': csrftoken,
  Authorization: `Bearer ${userToken}`,
 };

 useEffect(() => {
  axios
   .get('https://backend-e4ds.onrender.com/get_category/')
   .then((response) => setCategories(response.data))
   .catch((error) => console.error('Error fetching categories:', error));
 }, []);

 useEffect(() => {
  const fetchDetail = async () => {
   try {
    const response = await axios.get(`https://backend-e4ds.onrender.com/${slug}/post_detail`);
    setData(response.data);
   } catch (error) {
    console.error(error);
   }
  };
  fetchDetail();
 }, [slug]);

 useEffect(() => {
  fetchProfile();
 }, [userToken]);

 const submitChanges = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', e.target.title.value);
  formData.append('content', e.target.content.value);
  formData.append('status', e.target.status.value);
  formData.append('category', e.target.category.value);
  if (imageFile) {
   formData.append('image', imageFile);
  }

  try {
   await axios.put(`https://backend-e4ds.onrender.com/${slug}/post_edit`, formData, {
    headers: {
     'Content-Type': 'multipart/form-data',
     Authorization: `Bearer ${userToken}`,
    },
   });
   toast.success('Post updated successfully!', { position: 'top-center' });
  } catch (error) {
   console.error('Error submitting post:', error);
   toast.error('Failed to update post. Please try again.', { position: 'top-center' });
  }
 };

 const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
 };

 const submitComment = (e) => {
  e.preventDefault();
  const comment = { content: e.target.content.value };
  axios
   .post(`https://backend-e4ds.onrender.com/${slug}/post_comment`, comment, { headers })
   .then(() => toast.success('Comment added!', { position: 'top-center' }))
   .catch((error) => {
    console.error('Error submitting comment:', error);
    toast.error('Failed to add comment.', { position: 'top-center' });
   });
 };

 return (
  <>
   {data?.author === profile?.id ? (
    <div className="flex justify-center items-center bg-black min-h-screen text-white">
     <form className="flex flex-col w-[90%] max-w-md bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={submitChanges}>
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>
      <label htmlFor="title" className="mb-2">Title</label>
      <input type="text" name="title" id="title" className="p-2 mb-4 text-black rounded-md" defaultValue={data.title} />
      <label htmlFor="content" className="mb-2">Content</label>
      <textarea name="content" id="content" rows="6" className="p-2 mb-4 text-black rounded-md" defaultValue={data.content} />
      <label htmlFor="image" className="mb-2">Image</label>
      <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} className="mb-4" />
      <label htmlFor="status" className="mb-2">Status</label>
      <select name="status" id="status" className="p-2 mb-4 text-black rounded-md">
       <option value="d">Draft</option>
       <option value="p">Published</option>
      </select>
      <label htmlFor="category" className="mb-2">Category</label>
      <select name="category" id="category" className="p-2 mb-6 text-black rounded-md">
       {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
       ))}
      </select>
      <button type="submit" className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 text-white font-semibold">Update Post</button>
     </form>
     <ToastContainer />
    </div>
   ) : (
    <div className="flex flex-col items-center bg-black min-h-screen text-white py-10">
     <h1 className="text-2xl font-bold mb-4">{data?.title}</h1>
     <p className="mb-4">{data?.content}</p>
     <p className="mb-4">Category: {data?.category}</p>
     {data.comments?.length > 0 && (
      <div className="mb-4">
       <h2 className="font-semibold mb-2">Comments:</h2>
       {data.comments.map((comment, index) => (
        <p key={index} className="text-gray-400">{comment.content}</p>
       ))}
      </div>
     )}
     <p className="mb-4">Likes: {data?.likes?.length || 0}</p>
     <form className="flex flex-col w-[90%] max-w-md bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={submitComment}>
      <h2 className="text-lg font-bold mb-4">Leave a Comment</h2>
      <textarea name="content" rows="4" className="p-2 mb-4 text-black rounded-md" placeholder="Write your comment here..." />
      <button type="submit" className="p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-300 text-white font-semibold">Submit Comment</button>
     </form>
     <ToastContainer />
    </div>
   )}
  </>
 );
};

export default PostEdit;