import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
          const userCred = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/getUser`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          });
          if (userCred) setCurrUser(userCred.data);
        } catch {
          alert("User not authorized!");
        }
      };
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchRoom = async () => {
        try {
          const room = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/roomate/getRoom/${id}`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          });
          setCurrRoom(room.data);
        } catch {
          navigate("/roomate");
          alert("Something wrong occurred!");
        }
      };
      fetchRoom();
    }
  }, [user]);

  const handleLeft = () => setInd(ind === 0 ? currRoom?.roomphotos.length - 1 : ind - 1);
  const handleRight = () => setInd(ind === currRoom?.roomphotos.length - 1 ? 0 : ind + 1);
  const handleClose = () => navigate("/roomate");
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/roomate/deleteRoom/${id}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      navigate("/roomate");
    } catch {
      alert("Something wrong occurred!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50">

      <div className="flex gap-4 justify-center">
        <button 
          onClick={handleClose} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg text-sm sm:text-base transition"
        >
          Close
        </button>
        {currRoom?.userid._id === currUser?._id && (
          <button 
            onClick={handleDelete} 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg text-sm sm:text-base transition"
          >
            Delete
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl justify-center items-center">

        <div className="flex-1 bg-gradient-to-tr from-purple-100 to-indigo-100 rounded-3xl p-6 flex flex-col gap-4 shadow-xl hover:shadow-2xl transition w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            Make <span className="text-blue-500 text-2xl sm:text-3xl">{currRoom?.userid.name}</span> your room partner
          </h2>
          <p className="text-gray-700 font-medium text-center text-sm sm:text-base">
            <span className="font-semibold text-blue-500">Interests : </span> {currRoom?.userid.interests.join(", ")}
          </p>
          <p className="text-gray-700 font-medium text-center text-sm sm:text-base">
            <span className="font-semibold text-blue-500">Location : </span> 
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${currRoom?.location}`}
              className="px-2 py-1 bg-purple-400 text-white rounded-full text-xs sm:text-sm hover:bg-purple-500 transition"
            >
              {currRoom?.location}
            </a>
          </p>
          <p className="text-gray-700 font-medium text-center text-sm sm:text-base">
            <span className="font-semibold text-blue-500">Features : </span> {currRoom?.features}
          </p>
          <p className="text-gray-700 font-medium text-center text-sm sm:text-base">
            <span className="font-semibold text-blue-500">Phone : </span> {currRoom?.phonenumber}
          </p>
          <p className="text-gray-700 font-medium text-center text-sm sm:text-base">
            <span className="font-semibold text-blue-500">Room partners required : </span> {currRoom?.numberofroomaterequired}
          </p>
        </div>

        <div className="flex-1 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-3xl p-4 flex items-center justify-center shadow-xl hover:shadow-2xl transition w-full relative">
          {currRoom?.roomphotos?.length === 0 ? (
            <p className="text-gray-700 font-bold text-base sm:text-lg">No photos available</p>
          ) : (
            <div className="relative w-full flex items-center justify-center">
              <button 
                onClick={handleLeft} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 transition z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <img 
                src={currRoom?.roomphotos[ind]} 
                alt="Room" 
                className="w-full max-w-md h-64 sm:h-72 lg:h-80 object-cover rounded-xl mx-auto" 
              />
              <button 
                onClick={handleRight} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 transition z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Room;

