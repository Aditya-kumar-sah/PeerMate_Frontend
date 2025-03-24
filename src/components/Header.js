import React, { useEffect } from 'react'
import { useUserContext } from '../context/Usercontext'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const {currUser,user,setCurrUser} = useUserContext();


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
                  alert("Something wrong occurred!")
              }
          }
          fetchUser();
      }
  }, [user])

  return (
    <div className='flex flex-col  lg:flex-row justify-center lg:justify-around items-center h-auto  gap-4  w-[100%] px-6 py-4 bg-purple-500'>
       <div className='flex flex-col items-center lg:flex-row gap-3 h-auto lg:h-full w-full lg:w-[50%] text-white font-bold'>
          <div className='text-xl'><Link to="/home" >Home</Link></div>
          <div className='text-xl'><Link to="/peers" >Peers</Link></div>
          <div className='text-xl'><Link to="/roomate" >Roomate</Link></div>
       </div>
       <div className='text-white text-center font-bold text-2xl w-full lg:w-[50%] h-auto lg:h-full lg:text-right' >{currUser?.name}</div>
    </div>
  )
}

export default Header
