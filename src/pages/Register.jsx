import React from 'react'
import axios from "axios"

const Register = () => {
 const submitForm = (e) => {
  e.preventDefault()
  const data = {
   username: e.target.username.value,
   password: e.target.password.value,
   email: e.target.email.value,
  }
  const response = axios
   .post("https://backend-e4ds.onrender.com/account/register/", data)
  //  .post("http://127.0.0.1:8000/account/register/", data)
   .then(res => console.log(res))
   .catch(error => console.log(error))
   console.log(response)
 }
 return (
  <div className='flex flex-col items-center bg-black h-[100vh] text-white'>
   Register form
   <form action="" onSubmit={submitForm} className='flex flex-col'>
    <input type="text" name='username' placeholder='username' className='text-black'/>
    <input type="email" name='email' placeholder='email' className='text-black'/>
    <input type="password" name='password' placeholder='password' className='text-black'/>
    <button type='submit'>Submit</button>
   </form>
  </div>
 )
}

export default Register