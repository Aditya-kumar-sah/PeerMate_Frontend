import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../context/Usercontext';
import axios from 'axios';
import Header from '../components/Header';
import Posts from "../components/Posts"

const UserProfile = () => {

  const { id } = useParams();
  const { user } = useUserContext();
  const [currUser, setCurrUser] = useState(null);
  const [currPeer, setCurrPeer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts,setPosts] = useState([]);


  useEffect(() => {
    if (user) {
      const fetchPost = async () => {
        try {
          const postCred = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/post/userPost/${id}`, {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          })
          if (postCred) {
            setPosts(postCred.data);
          }

        } catch (error) {
          console.log(error);
          alert("Something wrong occurred!")
        }
      }
      fetchPost();
    }
  }, [user, loading])


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
          console.log(error);
          alert("Something wrong occurred!")
        }
      }
      fetchUser();
    }
  }, [user, loading])

  useEffect(() => {
    const fetchPeer = async () => {
      if (user) {
        try {
          const peerCred = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/getPeerDetails/${id}`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })

          if (peerCred) {
            setCurrPeer(peerCred.data);
          }
        } catch (error) {
          console.log(error);
          alert("Something wrong occurred!")
        }
      }
    }
    fetchPeer();
  }, [user, loading])

  const handleAddFriend = async () => {
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/addFriends/${currPeer._id}`, null,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`
          }
        })
      alert("Friend added")
    } catch (error) {
      console.log(error);
      alert("Something wrong occurred!")
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const handleRemoveFriend = async () => {
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/removeFriend/${currPeer._id}`, null,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`
          }
        })
      alert("Friend removed")
    } catch (error) {
      alert("Something wrong occurred!")
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  if (loading) {
    return (
      <div className='bg-purple-500 fixed inset-0 flex items-center justify-center'>
        <div className='text-white font-bold text-2xl animate-pulse'>Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header/>
      <div className='flex flex-col items-center w-full px-4 py-6 gap-6'>
        <div className='flex flex-col lg:flex-row w-full max-w-7xl gap-6'>
          
          <div className='flex flex-col items-center gap-4 bg-white shadow-md rounded-xl p-6 w-full lg:w-1/4'>
            <img 
              className='h-48 w-48 object-cover rounded-full border-4 border-purple-400 shadow-md' 
              src={currPeer?.profilepic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} 
              alt="profile"
            />
            {!loading && currUser?._id !== currPeer?._id ? (
              (currUser?.friends?.includes(currPeer?._id) && currPeer?.friends?.includes(currUser?._id)) ?
                <button onClick={handleRemoveFriend} className='w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition'>
                  Remove Friend
                </button> :
                <button onClick={handleAddFriend} className='w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition'>
                  Add Friend
                </button>
            ) : null}
          </div>

          <div className='flex flex-col flex-1 gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='bg-purple-100 rounded-lg p-4 shadow'>
                <div className='text-lg font-semibold text-purple-800'>Email</div>
                <div className='mt-2 text-gray-700 font-medium break-words'>{currPeer?.email}</div>
              </div>
              <div className='bg-purple-100 rounded-lg p-4 shadow'>
                <div className='text-lg font-semibold text-purple-800'>Name</div>
                <div className='mt-2 text-gray-700 font-medium break-words'>{currPeer?.name}</div>
              </div>
              <div className='bg-purple-100 rounded-lg p-4 shadow'>
                <div className='text-lg font-semibold text-purple-800'>Branch</div>
                <div className='mt-2 text-gray-700 font-medium break-words'>{currPeer?.branch}</div>
              </div>
              <div className='bg-purple-100 rounded-lg p-4 shadow'>
                <div className='text-lg font-semibold text-purple-800'>Batch</div>
                <div className='mt-2 text-gray-700 font-medium break-words'>{currPeer?.yearofpassout}</div>
              </div>
              <div className='bg-purple-100 rounded-lg p-4 shadow col-span-1 md:col-span-2'>
                <div className='text-lg font-semibold text-purple-800'>Interests</div>
                <div className='mt-2 flex flex-wrap gap-2'>
                  {(currPeer?.interests.length === 0) ? 
                    <div className='text-gray-500 font-medium'>No Interests</div> :
                    currPeer?.interests.map((ele, ind) => (
                      <div key={ind} className='bg-purple-200 text-purple-900 px-3 py-1 rounded-full text-sm font-medium shadow-sm'>
                        {ele}
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className='bg-purple-100 rounded-lg p-4 shadow col-span-1 md:col-span-2'>
                <div className='text-lg font-semibold text-purple-800'>Bio</div>
                <div className='mt-2 text-gray-700 font-medium break-words'>{currPeer?.bio ? currPeer?.bio : "No Bio"}</div>
              </div>
            </div>
          </div>

          <div className='w-full lg:w-1/3 bg-white shadow-md rounded-xl p-4 flex flex-col items-center gap-4 max-h-[500px] overflow-y-auto'>
            <h1 className='text-purple-700 font-bold text-xl'>Posts</h1>
            {posts.length === 0 ? 
              <div className='text-gray-500'>User has no posts!</div> :
              posts.map((post, i) => <Posts key={i} post={post} />)
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserProfile
