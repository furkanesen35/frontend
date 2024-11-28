import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode library

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);

  // Helper to get cookie by name
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  // CSRF Token from cookies
  const csrftoken = getCookie('csrftoken');

  const axiosInstance = axios.create({
    baseURL: 'https://backend-e4ds.onrender.com/',
    timeout: 10000,
    headers: {
      Authorization: userToken ? `Bearer ${userToken}` : '', // Attach token if available
    },
    withCredentials: true, // Ensures cookies are sent
  });

  // Load token from cookies on component mount
  useEffect(() => {
    const token = getCookie('token');
    console.log('Token:', token); // Debugging token value
    setUserToken(token);
  }, []);
  

  // Login: Save token to cookies and state
  const loginUser = (token) => {
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; Secure; HttpOnly`;
    setUserToken(token);
  };

  // Logout: Clear token from cookies and state
  const logoutUser = () => {
    document.cookie = 'token=; path=/; max-age=0;';
    setUserToken(null);
  };

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      if (userToken) {
        const decoded = jwtDecode(userToken);
        const userId = decoded.user_id;
        const response = await axiosInstance.get(`/account/get_user_profile/${userId}`);
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch posts
  const fetchedData = async () => {
    try {
      const response = await axiosInstance.get('/post/get/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userToken,
        loginUser,
        logoutUser,
        posts,
        fetchProfile,
        profile,
        fetchedData,
        axiosInstance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
