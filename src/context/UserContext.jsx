import React, { createContext, useState, useEffect } from 'react';
import axios from "axios"
import { jwtDecode } from "jwt-decode";


const UserContext = createContext();

const UserProvider = ({ children }) => {
 const [userToken, setUserToken] = useState(localStorage.getItem("token"));
 const [posts, setPosts] = useState([]);
 const [profile, setProfile] = useState(null);
 const [users, setUsers] = useState([]);

 function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
 }
 
 const csrftoken = getCookie('csrftoken');

 const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_DOMAIN_URL,
  baseURL: 'https://backend-e4ds.onrender.com/',
  // baseURL: 'http://127.0.0.1:8000/',
  timeout: 10000,
  headers:  {
   'X-CSRFToken': csrftoken,
   Authorization: `Bearer ${userToken}`,
  }
 })

 //login part
 useEffect(() => {
  setUserToken(localStorage.getItem('token'));
 }, []);

 const loginUser = (token) => {
  localStorage.setItem('token', token);
  setUserToken(token);
 };

 const logoutUser = () => {
  localStorage.removeItem('token');
  setUserToken(null);
 };

 //profile part
 const fetchProfile = async () => {
  try {
   if (userToken) {
    const decoded = jwtDecode(userToken);
    const user = decoded.user_id;
    const response = await axiosInstance.get(`/account/get_user_profile/${user}`);
    setProfile(response.data);
   }
  } catch (error) {
   console.error('Error fetching profile:', error);
  }
 };

 //post part
 const fetchedData = async () => {
   try {
    const response = await axiosInstance.get("/post/get/")
    setPosts(response.data)
   } catch (error) {
    console.log(error);
   }
  }

 useEffect(() => {
  axios
   .get('https://backend-e4ds.onrender.com/account/all_users/')
   .then(response => {
     setUsers(response.data);
   })
   .catch(error => {
    console.error('Error fetching users:', error);
   });
 }, []);

 return (
  <UserContext.Provider value={{ userToken, loginUser, logoutUser, posts, fetchProfile, profile, fetchedData, axiosInstance, users }}>
   {children}
  </UserContext.Provider>
 );
};

export { UserProvider, UserContext };