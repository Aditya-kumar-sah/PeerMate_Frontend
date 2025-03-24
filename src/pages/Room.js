import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserContext } from '../context/Usercontext';
import axios from 'axios';

const Room = () => {

    const { id } = useParams();
    const { user, currUser, setCurrUser } = useUserContext();
    const [currRoom, setCurrRoom] = useState(null);
    const [ind, setInd] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fetchUser = async () => {
                try {
                    const userCred = await axios.get("/user/getUser", {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`,
                        },
                    })
                    if (userCred) {
                        setCurrUser(userCred.data);
                    }

                } catch (error) {
                    console.log(error);
                    alert("User not authorized!")
                }
            }
            fetchUser();
        }
    }, [user])


    useEffect(() => {
        if (user) {
            const fetchRoom = async () => {
                try {
                    const room = await axios.get(`/roomate/getRoom/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    })
                    setCurrRoom(room.data);
                } catch (error) {
                    navigate("/roomate");
                    alert("Something wrong occurred!")
                    setCurrRoom(null);
                    console.log(error);

                }
            }
            fetchRoom();
        }
    }, [user])

    const handleLeft = () => {
        let newInd;
        if (ind === 0) {
            newInd = currRoom?.roomphotos.length - 1;
        }
        else {
            newInd = ind - 1;
        }
        setInd(newInd);
    }

    const handleRight = () => {
        let newInd;
        if (ind === currRoom?.roomphotos.length - 1) {
            newInd = 0;
        }
        else {
            newInd = ind + 1;
        }
        setInd(newInd);
    }

    const handleClose = () => {
        navigate("/roomate")
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`/roomate/deleteRoom/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            })
            navigate("/roomate")
        } catch (error) {
            alert("Something wrong occurred!")
            console.log(error);
        }
    }

    return (
        <div className='h-auto lg:h-screen w-full flex flex-col lg:flex-row  gap-2 items-center justify-center px-6 py-5 bg-purple-400'>
            <div className='flex items-center justify-center gap-3'>
                <button onClick={handleClose} className='bg-blue-500 text-white font-bold px-3 py-2 rounded-[5px]'>Close</button>
                {(currRoom?.userid._id === currUser?._id) && <button onClick={handleDelete} className='bg-red-500 text-white font-bold px-3 py-2 rounded-[5px]'>Delete</button>}
            </div>
            <div className='w-full lg:w-[50%] h-auto lg:h-[70%] rounded-md bg-purple-600 px-5 py-4 flex flex-col items-start gap-4 overflow-y-auto overflow-x-auto scrollbar-none'>
                <div className='text-white font-bold text-2xl font-mono'>Make <span className='text-blue-300 text-4xl'>{currRoom?.userid.name}</span> your room partner</div>
                <div className='text-gray-200 text-[15px] font-bold flex  items-center break-words'><span className='text-blue-200'>Interests</span>: {currRoom?.userid.interests[0]} and {currRoom?.userid.interests[1]}</div>
                <div className='text-gray-300 text-[15px] font-bold flex  items-center break-words'><span className='text-blue-200'>Location</span>:<a href={`https://www.google.com/maps/search/?api=1&query=${currRoom?.location}`}> {currRoom?.location}</a></div>
                <div className='flex items-start gap-4'>
                    <div className='text-blue-200 text-xl font-bold'>Features: </div>
                    <div className='text-white max-w-md flex items-center justify-center'><p className='break-words'> {currRoom?.features}</p></div>
                </div>
                <div className='text-blue-200 text-[15px] text-3xl font-bold flex items-center gap-1 break-words'>You can call on this phone number to book the room:<span className='text-2xl text-white'>{currRoom?.phonenumber}</span></div>
                <div className='text-white font-bold text-xlfont-mono'> Number of room partners required is <span className='text-xl'>{currRoom?.numberofroomaterequired}</span></div>
            </div>
            <div className='w-full lg:w-[50%] h-auto  lg:h-[70%] p-5 flex items-center justify-center rounded-md bg-purple-700 px-3 py-2 overflow-x-auto scrollbar-none'>
                {
                    (currRoom?.roomphotos.length === 0) ? (<div className='text-white font-bold text-2xl'>Sorry no photos available!</div>) :
                        (<div className='w-[100%] h-full flex items-center justify-center gap-4'>
                            <div className='cursor-pointer' onClick={handleLeft}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <img className='h-[80%]  w-[80%] rounded-xl' src={currRoom?.roomphotos[ind]} alt='Available soon!' />
                            <div className='cursor-pointer' onClick={handleRight}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}

export default Room
