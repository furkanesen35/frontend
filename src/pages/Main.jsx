import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import LikeButton from '../components/LikeButton';

const Main = () => {
 const { userToken, posts, fetchedData, axiosInstance } = useContext(UserContext);
 const [categories, setCategories] = useState([]);

 useEffect(() => {
  axiosInstance.get('/get_category/')
   .then(response => {
    setCategories(response.data);
   })
   .catch(error => {
    console.error('Error fetching categories:', error);
   });
 },[]);
  
 useEffect(() => {
  fetchedData()
 }, [])
  
 return (
  <>{userToken ? 
   <div className='flex justify-center bg-black text-white min-h-dvh'>
    <ul>
     {posts.map((post, index) => (
      <li key={index} className='flex flex-col justify-start w-[300px] h-[800px] 2xs:w-[350px] xs:w-[450px] sm:w-[550px] md:w-[700px] lg:w-[470px] xl:w-[550px] 2xl:w-[650px] 3xl:w-[700px]'>
       <a className='flex justify-center items-center w-[100%] mt-[20px] text-center text-[28px] font-bold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-orange-500/50 rounded-lg px-6 py-3 transition-all duration-300 ease-in-out' href={`/detail/${post.slug}`}><div>{post.title}</div></a>
       <div className='flex justify-center'>
        <a href={`/detail/${post.slug}`} className='mw-[300px] mt-[20px]'>
         <img src={`https://backend-e4ds.onrender.com/${post.image}`} alt="" />
         {/* <img src={`http://127.0.0.1:8000/${post.image}`} alt="" /> */}
        </a> 
       </div>
       <div className='p-[4px]'>Category: {categories.map(category => category.id === post.category ? category.name : null) }</div>
       <div className='p-[4px]'>Description: {post.content}</div>
       {post.comments.length ? <div className='w-[100%] h-[150px] rounded-[5px] border border-white p-[5px]'>Comments: {post.comments.map((e, index) => ( <div key={index}>{e.content}</div>))}</div> : <></>}
       <LikeButton post={post}/>
      </li>
     ))}
    </ul>
   </div> : 
   <div className='flex justify-center bg-black h-[1000vh] text-white'>
    Please
    <a href="/login">
     Login
    </a>
   </div>
  }
  </>
 )
}

export default Main