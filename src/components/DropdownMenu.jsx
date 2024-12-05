import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const DropdownMenu = () => {
 const { userToken } = useContext(UserContext);
 const [isOpen, setIsOpen] = useState(false);
 const toggleMenu = () => {
  setIsOpen(!isOpen);
 };

 return (
  <nav className="flex flex-col items-center bg-gray-800 lg:hidden">
   <div className='fixed rounded-[100%] bg-white hover:bg-orange-400 active:bg-red-800 top-[37px] left-[60px] text-white w-[40px] h-[40px] flex justify-center items-center cursor-pointer' onClick={toggleMenu}>
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
   </div>
   { userToken ?   
    <div className={`flex flex-col transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
     <Link className="bg-blue-500 w-[140px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-[12px] text-center" to="/">Home</Link>
     <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/profile">Profile</Link>
     <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/post">Post</Link>
     <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/category">Add Category</Link>
     <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/logout">Log out</Link>
    </div> :
    <div className={`flex flex-col transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
     <Link className="bg-blue-500 w-[140px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-[12px] text-center" to="/">Home</Link>
     <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/login">Login</Link>
     <Link className="border border-blue-500 w-[140px] text-blue-500 hover:text-orange-400 hover:border-orange-400 font-bold py-2 px-4 rounded m-[12px] text-center" to="/register">Register</Link>
    </div>
   }
  </nav>
 );
};

export default DropdownMenu;