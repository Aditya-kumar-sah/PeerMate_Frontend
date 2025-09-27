import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/Usercontext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyRooms = () => {
  const { user } = useUserContext();
  const [yourRooms, setYourRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchAllRooms = async () => {
        setLoading(true);
        try {
          const allRoom = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/roomate/getMyRoom`, {
            headers: { Authorization: `Bearer ${user?.accessToken}` }
          });
          setYourRooms(allRoom.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          alert("Something wrong occurred!");
        }
      };
      fetchAllRooms();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-purple-50 z-50">
        <div className="text-purple-700 text-3xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full px-4 py-6 bg-gray-50">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 text-center">Your Rooms</h2>
      {yourRooms.length === 0 ? (
        <div className="text-xl lg:text-2xl text-purple-700 text-center font-semibold">
          No rooms posted by you
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {yourRooms.map((room) => (
            <Link key={room._id} to={`/room/${room._id}`} className="w-full flex justify-center">
              <div className="bg-purple-200 rounded-xl p-6 flex flex-col gap-3 w-[98%] sm:w-[95%] lg:w-[90%]">
                <div className="text-xl font-bold text-purple-900">
                  <span className="text-2xl font-mono pr-2">{room.userid.name}</span> needs a roommate!
                </div>
                <div className="text-purple-800 font-medium text-sm">
                  Interests: <span className="font-semibold">{room.userid.interests[0]}</span> and <span className="font-semibold">{room.userid.interests[1]}</span>
                </div>
                <div className="text-purple-900 font-medium text-sm">
                  Location: 
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    href={`https://www.google.com/maps/search/?api=1&query=${room.location}`} 
                    className="ml-2 px-3 py-1 bg-purple-400 text-white rounded-full font-semibold text-sm"
                  >
                    {room.location}
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRooms;
