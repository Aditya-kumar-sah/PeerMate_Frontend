import React, { useEffect } from 'react'
import { useUserContext } from '../context/Usercontext';
import Tasks from './Tasks';
import {Link} from "react-router-dom"
import axios from 'axios';

const Profile = () => {
    const { currUser,setCurrUser,user, logoutUser } = useUserContext();

    
    const handleSignOut = async () => {
        try {
            await logoutUser();
            setCurrUser(null)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            const fetchUser = async () => {
                try {
                    const userCred = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/getUser`, {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`,
                        },
                    })
  
                    if (userCred) {
                        setCurrUser(userCred.data);
                    }
                } catch (error) {
                    alert("Something wrong occurred!")
                    console.log(error);
                    
                }
            }
            fetchUser();
        }
    }, [user])



    return (
        <div className='flex flex-col lg:flex-row items-center justify-center gap-2 py-3 px-2 bg-purple-100 h-auto w-[100%]  '>
                <div  className=' bg-purple-300 p-2 m-2 flex flex-col items-center justify-center gap-2 rounded-[10px] shadow-md h-auto w-[80%] lg:w-[60%] hover:shadow-lg overflow-x-auto overflow-y-auto scrollbar-none '>
                    <div className='flex flex-col lg:flex-row w-full h-full items-center  gap-4 p-2  lg:justify-between overflow-x-auto '>
                        <div className='flex flex-col  items-center gap-2 w-auto'>
                            <div className='w-full flex items-center justify-center'><img className='h-38 w-40 rounded-md border-2 border-gray-400' src={currUser?.profilepic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} /></div>
                            <div className='p-3 w-full flex items-center justify-center'><button className='bg-red-500 text-white font-bold px-3 py-2 rounded-md' onClick={handleSignOut} >Logout</button></div>
                        </div>
                        <div className='w-auto'>
                        <Link to="/profileUpdate" className='flex w-full flex-col gap-2 p-4 '>
                            <div className='w-full flex flex-col sm:flex-row  gap-1 items-center  border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400 overflow-auto'>
                                <div className='w-full text-2xl font-bold text-gray-100'>Email:</div>
                                <div className='w-full border border-gray-500 rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold break-words'>{currUser?.email}</div>
                            </div>
                            <div className='flex flex-col sm:flex-row overflow-auto gap-1 items-center border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
                                <div className='w-full text-2xl font-bold text-gray-100'>Name:</div>
                                <div className='w-full border border-gray-500 rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold'>{currUser?.name}</div>
                            </div>
                            <div className='flex flex-col sm:flex-row overflow-auto gap-1 items-center   border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
                                <div className='w-full text-2xl font-bold text-gray-100'>Branch:</div>
                                <div className='w-full border border-gray-500 rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold'>{currUser?.branch}</div>
                            </div>
                            <div className='flex flex-col sm:flex-row overflow-auto gap-1 items-center   border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
                                <div className= 'w-full text-2xl font-bold text-gray-100'>Interest:</div>
                                <div className='flex flex-col md:flex-row w-full md:items-center gap-1'>
                                {(currUser?.interests.length === 0) ? <div className='w-full border border-gray-500 rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold'>No Interests</div> :
                                    (
                                        currUser?.interests.map((ele, ind) => {
                                            return <div className='w-full border border-gray-500 rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold' key={ind}>{ele}</div>
                                        })
                                    )
                                }
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row overflow-auto gap-1 items-center  border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
                                <div className='w-full text-2xl font-bold text-gray-100'>Batch:</div>
                                <div className='w-full border border-gray-500 rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold'>{currUser?.yearofpassout}</div>
                            </div>
                        </Link>
                        </div>
                    </div>
                </div >
            <div className='bg-purple-300 p-10 flex flex-col gap-2 lg:w-[60%] w-[80%] rounded-[10px] shadow-md  h-auto hover:shadow-lg overflow-y-auto overflow-x-auto scrollbar-none'>
                <Tasks />
            </div>
        </div>
    )
}

export default Profile
