import React, { useEffect } from 'react'
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "../firebaseConfig/Firebase"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../context/Usercontext';

const auth = getAuth(app);

const RegisterPage = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [yearofpassout, setYearOfPassout] = useState(0);

  const {user} = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/home")
    }
  }, [user, navigate])

  const handleSubmitEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/register`, {
        email, name, branch, yearofpassout
      })
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login")

    } catch (error) {
      console.log(error);
      alert("Registeration failed!")
    }
  }

  return (
    <div className="flex justify-center items-center  h-auto mt-0 w-full bg-purple-400 ">
      <div className="border border-gray-500 rounded-[5px] my-10 p-10 h-[90%] w-[70%] md:w-[50%] lg:h-auto lg:w-[30%] flex flex-col items-center gap-6 bg-purple-500 overflow-y-auto scrollbar-none">
        <div className="text-gray-100 font-bold text-3xl text-center">Register</div>
        <div className="w-full ">
          <input className="px-3 py-2 border border-grar-400 rounded-[10px] w-full outline-none" placeholder='Email' type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />
        </div>
        <div className="w-full ">
          <input className="px-3 py-2 border border-grar-400 w-full rounded-[10px] outline-none" placeholder='Password (atleast 6 chars)' type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />
        </div>
        <div className="w-full ">
          <input className="px-3 py-2 border border-grar-400 w-full rounded-[10px] outline-none" placeholder='Name' type="text" value={name} onChange={e => setName(e.target.value)} name="name" />
        </div>
        <div className="w-full ">
          <input className="px-3 py-2 border border-grar-400 w-full rounded-[10px] outline-none" placeholder='Branch' type="text" value={branch} onChange={e => setBranch(e.target.value)} name="branch" />
        </div>
        <div className="w-full">
          <input className="px-3 py-2 border border-grar-400 w-full rounded-[10px] outline-none" placeholder='Year of passout' type="number" value={yearofpassout} onChange={e => setYearOfPassout(e.target.value)} name="yearofpassout" />
        </div>

        <div className='w-full'><button className="border w-full border-gray-400 rounded-[5px] px-3 py-1 bg-blue-600 text-white font-bold" onClick={handleSubmitEmailAndPassword}>Register</button></div>

        <div className="text-white font-bold">Already Registered? <Link className='text-purple-800' to="/login">Login</Link></div>
      </div>
    </div>
  )
}

export default RegisterPage
