import React, {  useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useUserContext } from '../context/Usercontext';

const LoginPage = () => {

    const {user,loginUser} = useUserContext()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmitEmailAndPassword = async () => {
          try {
             await loginUser(email,password);
          } catch (error) {
             console.log(error);
             alert("login failed!")
          }
    }

    useEffect(()=>{
        if(user){
            navigate("/home")
        }
    },[user,navigate])

    return (
        <div className="flex justify-center items-center h-auto lg:h-screen  w-full bg-purple-400 ">
            <div className="border border-gray-500 rounded-[5px] my-10 p-10 h-[90%] w-[60%] md:w-[40%]  lg:h-auto lg:w-auto flex flex-col items-center justify-center gap-6 bg-purple-500 overflow-y-auto overflow-x-auto scrollbar-none">
                <div className="text-gray-100 font-bold text-3xl text-center">Login</div>
                <div className="w-full ">
                    <input  className="px-3 py-2 border border-grar-400 rounded-[10px] w-full outline-none" placeholder='Email' type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />
                </div>
                <div className="w-full">
                    <input className="px-3 py-2 border border-grar-400 w-full rounded-[10px] outline-none" placeholder='Password (atleast 6 chars)' type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />
                </div>

                <div className='w-full'><button className="border w-full border-gray-400 rounded-[5px] px-3 py-1 bg-blue-600 text-white font-bold" onClick={handleSubmitEmailAndPassword}>Login</button></div>

                <div className="text-white font-bold">Not Registered? <Link className='text-purple-800' to="/">Register</Link></div>
            </div>
        </div>
    )
}

export default LoginPage
