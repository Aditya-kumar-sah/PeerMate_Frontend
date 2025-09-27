import React, { useEffect } from 'react'
import { useUserContext } from '../context/Usercontext'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const { currUser, user, setCurrUser } = useUserContext();

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
        }
      }
      fetchUser();
    }
  }, [user])

  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-purple-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        
       
        <nav className="flex flex-col sm:flex-row items-center gap-4 text-white font-semibold text-lg">
          <Link to="/home" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/peers" className="hover:text-yellow-300 transition">Peers</Link>
          <Link to="/roomate" className="hover:text-yellow-300 transition">Roommate</Link>
        </nav>

      
        <div className="text-white font-bold text-xl sm:text-2xl text-center lg:text-right w-full lg:w-auto">
          {currUser?.name}
        </div>
      </div>
    </header>
  )
}

export default Header
