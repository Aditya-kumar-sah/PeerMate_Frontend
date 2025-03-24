import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Header';
import Profile from '../components/Profile';

const HomePage = () => {

    const { user } = useUserContext();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        setTimeout(()=>{
            if (!user) {
                navigate("/login")
            }
            else{
                setLoading(false);
            }
        },1000)
    }, [user, navigate])


    if(loading){
        return (
            <div className='bg-purple-400 fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center'>
                 <div className='text-white font-bold text-2xl'>Loading...</div>
            </div>
        );
    }
    
    return (
        <div className='absolute inset-0 flex flex-col items-center '>
            <Header/>
            <Profile/>
            <div className='bg-purple-500 w-[100%] h-[30%]  p-11  flex items-center justify-center text-white font-bold text-xl rounded-t-md '>
                @AdityaTech
            </div>
        </div>
    )
}

export default HomePage
