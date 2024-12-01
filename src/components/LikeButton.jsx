import React, { useContext } from 'react'
import axios from "axios"
import { UserContext } from '../context/UserContext';

const LikeButton = ({ post }) => {
 const { userToken, handleLike, fetchedData, axiosInstance } = useContext(UserContext);
 function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
 }
 
 const csrftoken = getCookie('csrftoken');
 
 const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': csrftoken,
  Authorization: `Bearer ${userToken}`,
 };

 const data = {
  id: post.id
 }

 const lastHandleLike = async () => {
  const response = await axiosInstance.post(`/${post.slug}/post_like/`, data)
  console.log(response.status);
  if (response.status === 200) {
   fetchedData()
  } else {
   // console.log(response.status);
  }
 }

 return (
  <div className='flex justify-center items-center flex-col'>
   <div>Likes: {post.likes.length}</div>
   <button className='bg-blue-500 w-[140px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-[12px] text-center' onClick={lastHandleLike}>Like</button>
  </div>
 )
}

export default LikeButton