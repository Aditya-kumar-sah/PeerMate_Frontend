import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/Usercontext';
import axios from "axios";
import { Link } from 'react-router-dom';

const AllRooms = ({ matches }) => {
  const firstMatch = matches.firstMatch;
  const secondMatch = matches.secondMatch;
  const { user } = useUserContext();

  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchAllRooms = async () => {
        setLoading(true);
        try {
          const allRoom = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/roomate/getAllRooms/${firstMatch}/${secondMatch}`, {
            headers: { Authorization: `Bearer ${user?.accessToken}` }
          });
          setAllRooms(allRoom.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          alert("Something wrong occurred!");
        }
      };
      fetchAllRooms();
    }
  }, [user, firstMatch, secondMatch]);

  if (loading) {
    return (
      <div className='fixed inset-0 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold'>
        Loading...
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-6 w-full p-4'>
      <div className='text-3xl sm:text-4xl font-bold text-gray-700 text-center'>
        Choose your room partner
      </div>

      {allRooms.length === 0 ? (
        <div className='text-2xl sm:text-3xl text-purple-800 text-center font-semibold'>
          Sorry, no room partner available!
        </div>
      ) : (
        <div className='flex flex-col items-center gap-6 w-full'>
          {allRooms.map((room) => (
            <Link key={room._id} to={`/room/${room._id}`} className='w-full flex justify-center'>
              <div className='bg-gradient-to-tr from-purple-100 to-indigo-100 w-full max-w-4xl rounded-3xl p-6 flex flex-col gap-3 shadow-lg hover:shadow-2xl transition duration-300'>
                <div className='text-xl sm:text-2xl text-gray-800 font-semibold'>
                  <span className='text-blue-500 font-mono text-2xl sm:text-3xl pr-2'>{room.userid.name}</span>
                  needs room partner!
                </div>
                <div className='text-gray-700 text-sm sm:text-base font-medium'>
                  <span className='font-semibold text-blue-500'>Interests:</span> {room.userid.interests[0]}, {room.userid.interests[1]}
                </div>
                <div className='text-gray-700 text-sm sm:text-base font-medium'>
                  <span className='font-semibold text-blue-500'>Location:</span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/maps/search/?api=1&query=${room.location}`}
                    className='ml-1 px-2 py-1 bg-purple-400 text-white rounded-full text-xs sm:text-sm hover:bg-purple-500 transition'
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

export default AllRooms;
