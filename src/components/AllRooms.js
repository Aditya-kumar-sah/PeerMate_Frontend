import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/Usercontext';
import axios from "axios"
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
          const allRoom = await axios.get(`/roomate/getAllRooms/${firstMatch}/${secondMatch}`,
            {
              headers: {
                Authorization: `Bearer ${user?.accessToken}`
              }
            })
          setAllRooms(allRoom.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          alert("Something wrong occurred!")
        }
      }
      fetchAllRooms();
    }
  }, [user, firstMatch, secondMatch])


  if (loading) {
    <div className='fixed inset-0 bg-purple-500 flex items-center justify-center text-white text-2xl font-bold'>
      Loading...
    </div>
  }


  return (
    <div className='flex flex-col items-center gap-4 w-full '>
      <div className='text-3xl font-bold text-gray-600'>Choose your room partner</div>
      {

        allRooms.length === 0 ? <div className='text-2xl text-purple-900 text-center font-bold'> Sorry,no room partner available! </div> :

          allRooms.map((room, ind) => {
            return (
              <Link to={`/room/${room._id}`} className='w-full flex items-center justify-center'>
                <div className='bg-purple-500 px-3 py-2 w-full rounded-[5px] flex flex-col items-start gap-3 overflow-x-auto shadow-md hover:shadow-2xl transition'>
                  <div className='text-xl text-white'><span className='text-white font-mono text-3xl pr-2 py-1'>{room.userid.name}</span> needs room partener!</div>
                  <div className='text-gray-200 text-[15px] font-bold'>Interests : {room.userid.interests[0]} and {room.userid.interests[1]}</div>
                  <div className='text-purple-900 text-[15px] font-bold'>Location :<a href={`https://www.google.com/maps/search/?api=1&query=${room.location}`}> {room.location}</a></div>
                </div>
              </Link>
            )
          })
      }
    </div>
  )
}

export default AllRooms
