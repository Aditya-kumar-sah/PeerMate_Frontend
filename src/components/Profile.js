import React, { useEffect } from 'react'
import { useUserContext } from '../context/Usercontext';
import Tasks from './Tasks';
import { Link } from "react-router-dom"
import axios from 'axios';

const Profile = () => {
  const { currUser, setCurrUser, user, logoutUser } = useUserContext();

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
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-md min-h-screen w-full">
    
      <div className="bg-white p-6 flex flex-col items-center justify-center gap-4 rounded-2xl shadow-lg w-full max-w-2xl transition hover:shadow-xl">
        <div className="flex flex-col lg:flex-row w-full h-full items-center gap-6">
          <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
            <img
              className="h-36 w-36 rounded-full border-4 border-purple-400 object-cover shadow-md"
              src={currUser?.profilepic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
              alt="profile"
            />
            <button
              className="bg-red-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-red-600 transition"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </div>
          <div className="flex-1 w-full">
            <Link to="/profileUpdate" className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border rounded-lg px-4 py-3 bg-purple-50 shadow">
                <div className="font-semibold text-gray-600 min-w-[80px]">Email:</div>
                <div className="flex-1 break-words text-purple-800 font-medium">{currUser?.email}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border rounded-lg px-4 py-3 bg-purple-50 shadow">
                <div className="font-semibold text-gray-600 min-w-[80px]">Name:</div>
                <div className="flex-1 text-purple-800 font-medium">{currUser?.name}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border rounded-lg px-4 py-3 bg-purple-50 shadow">
                <div className="font-semibold text-gray-600 min-w-[80px]">Branch:</div>
                <div className="flex-1 text-purple-800 font-medium">{currUser?.branch}</div>
              </div>
              <div className="flex  gap-2 border rounded-lg px-4 py-3 bg-purple-50 shadow">
                <div className="font-semibold text-gray-600">Interests:</div>
                <div className="flex flex-wrap gap-2">
                  {currUser?.interests.length === 0 ? (
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-600">No Interests</span>
                  ) : (
                    currUser?.interests.map((ele, ind) => (
                      <span key={ind} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium shadow-sm">
                        {ele}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border rounded-lg px-4 py-3 bg-purple-50 shadow">
                <div className="font-semibold text-gray-600 min-w-[80px]">Batch:</div>
                <div className="flex-1 text-purple-800 font-medium">{currUser?.yearofpassout}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

   
      <div className="bg-white p-6 flex flex-col gap-4 rounded-2xl shadow-lg w-full max-w-2xl transition hover:shadow-xl">
        <Tasks />
      </div>
    </div>
  )
}

export default Profile
