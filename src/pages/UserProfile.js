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
          const postCred = await axios.get(`/post/userPost/${id}`, {
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
          const peerCred = await axios.get(`/user/getPeerDetails/${id}`, {
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
      await axios.put(`/user/addFriends/${currPeer._id}`, null,
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
      await axios.put(`/user/removeFriend/${currPeer._id}`, null,
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
      <div className='bg-purple-400 fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center'>
        <div className='text-white font-bold text-2xl'>Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col absolute inset-0">
    <Header/>
    <div className='h-auto w-full flex flex-col gap-2 items-center bg-slate-200  '>
      <div className='  h-auto  flex   items-center justify-center w-[100%] px-4 py-3 rounded-md '>
        <div className='flex flex-col lg:flex-row h-auto items-center justify-center w-[100%] '>
          <div className=' flex lg:flex-col  rounded-md h-auto justify-center w-full lg:w-[20%] items-center gap-10'>
            <img className=' h-[240px] w-[240px] object-contain rounded-md ' src={currPeer?.profilepic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
            {!loading && currUser?._id !== currPeer?._id ? (
              <div>
                {(currUser?.friends?.includes(currPeer?._id) && currPeer?.friends?.includes(currUser?._id)) ?
                  <button onClick={handleRemoveFriend} className='bg-blue-500 text-white px-4 py-2 rounded'>Remove Friend</button> :
                  <button onClick={handleAddFriend} className='bg-blue-500 text-white px-4 py-2 rounded'>Add Friend</button>
                }
              </div>
            ) : null}
          </div>
          <div className='flex flex-col items-center justify-center  gap-2 h-auto w-full lg:w-[50%] px-3 m-2'>
            <div className='flex flex-col lg:flex-row  lg:overflow-x-auto scrollbar-none gap-2  items-center w-[80%]  justify-around border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
              <div className='text-2xl font-bold w-[100%] lg:w-[30%] text-gray-100'>Email:</div>
              <div className='border border-gray-500 w-[100%] lg:w-[70%]  rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold break-words'>{currPeer?.email}</div>
            </div>
            <div className='flex flex-col lg:flex-row  lg:overflow-x-auto scrollbar-none gap-2  items-center w-[80%]  justify-around border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
              <div className='text-2xl font-bold w-[100%] lg:w-[30%] text-gray-100'>Name:</div>
              <div className='border border-gray-500 w-[100%] lg:w-[70%]  rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold break-words'>{currPeer?.name}</div>
            </div>
            <div className='flex flex-col lg:flex-row  lg:overflow-x-auto scrollbar-none gap-2  items-center w-[80%]  justify-around border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
              <div className='text-2xl font-bold w-[100%] lg:w-[30%] text-gray-100'>Branch:</div>
              <div className='border border-gray-500 w-[100%] lg:w-[70%]  rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold break-words'>{currPeer?.branch}</div>
            </div>
            <div className='flex flex-col lg:flex-row  lg:overflow-x-auto scrollbar-none gap-2  items-center w-[80%]  justify-around border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
              <div className='text-2xl font-bold w-[100%] lg:w-[30%] text-gray-100'>Interests:</div>
              <div className='flex items-center gap-2 w-full overflow-x-auto scrollbar-none'>
              {(currPeer?.interests.length === 0) ? <div className='border w-[100%] border-gray-500 rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold'>No Interests</div> :
                (
                  currPeer?.interests.map((ele, ind) => {
                    return <div className='border border-gray-500 w-[100%] lg:w-[70%]  rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold break-words' key={ind}>{ele}</div>
                  })
                )
              }
              </div>
            </div>
            <div className='flex flex-col lg:flex-row  lg:overflow-x-auto scrollbar-none gap-2  items-center w-[80%]  justify-around border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
              <div className='text-2xl font-bold w-[100%] lg:w-[30%] text-gray-100'>Batch:</div>
              <div className='border border-gray-500 w-[100%] lg:w-[70%]  rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold break-words'>{currPeer?.yearofpassout}</div>
            </div>
            <div className='flex flex-col lg:flex-row  lg:overflow-x-auto scrollbar-none gap-2  items-center w-[80%]  justify-around border border-gray-500 rounded-[5px] px-4 py-2 bg-purple-400'>
              <div className='text-2xl font-bold w-[100%] lg:w-[30%] text-gray-100'>Bio:</div>
              <div className='border border-gray-500 w-[100%] lg:w-[70%]  rounded-[5px] px-4 py-2 text-purple-800 font-serif font-bold break-words'><p>{currPeer?.bio ? currPeer?.bio : "No Bio"}</p></div>
            </div>
          </div>
          <div className=' w-[80%] lg:w-[30%] h-full rounded-md bg-purple-500 overflow-y-auto scrollbar-none flex flex-col items-center gap-2 p-3'>
              <h1 className='text-white font-bold text-xl'>Posts</h1>
              {
                posts.length === 0 ? <div className='text-white'>User has no posts!</div> :
                posts.map(post=>{
                   return <Posts post={post} />
                })
              }
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default UserProfile
