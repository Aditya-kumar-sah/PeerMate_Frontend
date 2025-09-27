import React, { useEffect, useState } from 'react'
import Header from "./Header"
import { useUserContext } from '../context/Usercontext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Posts from './Posts';

const Peers = () => {
  const { user } = useUserContext();

  const [firstMatch, setFirstMatch] = useState("All");
  const [secondMatch, setSecondMatch] = useState("All");
  const [files, setFiles] = useState([]);
  const [thought, setThought] = useState("");
  const [posts, setPosts] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [peersWithSameInterests, setPeersWithSameInterests] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      const getAllPost = async () => {
        try {
          const allPosts = await axios.get(
            `${process.env.REACT_APP_BACKENDURL}/api/v1/2024/post/getAllPost`,
            {
              headers: {
                Authorization: `Bearer ${user?.accessToken}`
              }
            }
          )
          setPosts(allPosts.data)
        } catch (error) {
          alert("Something wrong occurred!")
        }
      }
      getAllPost();
    }
  }, [user])

  const addPost = async () => {
    if (!thought && !files) {
      alert("Please attach something to post");
      return;
    }

    setLoading(true)

    const formData = new FormData();
    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    } else formData.append('files', []);

    formData.append('thought', thought);

    try {
      await axios.post(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/post/uploadPost`, formData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setThought("");
      setFiles([]);

      setLoading(false)
      alert('posted successfully!');
    } catch (error) {
      setLoading(false)
      alert("Something wrong occurred")
    }
  }

  useEffect(() => {
    if (user) {
      const fetchPeers = async () => {
        try {
          const peers = await axios.get(
            `${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/getPeer/${firstMatch}/${secondMatch}`,
            {
              headers: {
                Authorization: `Bearer ${user?.accessToken}`
              }
            }
          )
          setPeersWithSameInterests(peers.data);
        } catch (error) {
          alert("Something wrong occurred!")
          setPeersWithSameInterests([]);
        }
      }
      fetchPeers();
    }
  }, [firstMatch, secondMatch, user])

  useEffect(() => {
    if (user) {
      const fetchFriends = async () => {
        try {
          const friends = await axios.get(
            `${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/getFriend`,
            {
              headers: {
                Authorization: `Bearer ${user?.accessToken}`
              }
            }
          )
          setFriendList(friends.data);
        } catch (error) {
          setFriendList([]);
          alert("Something wrong occurred!")
        }
      }
      fetchFriends();
    }
  }, [user])

   if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-purple-400 fixed inset-0 flex items-center justify-center">
        <div className="text-white font-extrabold text-3xl animate-pulse">Loading...</div>
      </div>
    );
  }


  return (
    <div className='min-h-screen w-full flex flex-col bg-gradient-to-b from-purple-100 via-purple-200 to-purple-300'>
      <Header />
      <div className='w-full flex-1 flex flex-col lg:flex-row gap-4 justify-center p-3 lg:p-6 overflow-hidden'>

        <div className='w-full lg:w-1/3 flex-shrink-0 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-3 border border-purple-200'>
          <div className='flex gap-2 items-center w-full'>
            <div className='w-full'>
              <select className='px-3 py-2 rounded-lg bg-purple-100 text-gray-700 w-full cursor-pointer focus:ring-2 focus:ring-purple-500 shadow-sm' value={firstMatch} onChange={(e) => setFirstMatch(e.target.value)} >
                <option value="All">AnyOne</option>
                <option value="SDE">SDE</option>
                <option value="DataAnalyst">DATA ANALYST</option>
                <option value="GATE">GATE</option>
                <option value="Masters">Masters</option>
                <option value="CivilServices">Civil Services</option>
                <option value="OtherGovtExams">OtherGovtExams</option>
              </select>
            </div>
            <div className='w-full'>
              <select className='px-3 py-2 rounded-lg bg-purple-100 text-gray-700 w-full cursor-pointer focus:ring-2 focus:ring-purple-500 shadow-sm' value={secondMatch} onChange={(e) => setSecondMatch(e.target.value)} >
                <option value="All">AnyOne</option>
                <option value="Cricket">Cricket</option>
                <option value="BasketBall">BasketBall</option>
                <option value="Badminton">Badminton</option>
                <option value="Football">Football</option>
                <option value="Chess">Chess</option>
              </select>
            </div>
          </div>
          <div className='bg-gray-50 rounded-lg h-full w-full px-2 pt-3 overflow-y-auto scrollbar-none'>
            {
              (peersWithSameInterests.length === 0) ?
                <div className='text-center text-gray-500 font-semibold w-full'>No such peer present!</div> :
                peersWithSameInterests.map((peer, ind) => {
                  return <Link key={ind} to={`/profile/${peer._id}`} className='block w-full p-1'>
                    <div className='w-full flex items-center gap-3 hover:shadow-lg hover:bg-purple-50 transition cursor-pointer bg-white px-3 py-2 rounded-lg border border-purple-100'>
                      <img className='h-12 w-12 object-cover rounded-full border-2 border-purple-400 shadow-sm' src={peer.profilepic ? peer.profilepic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                      <div className='flex flex-col'>
                        <div className='text-lg font-bold text-purple-700'>{peer.name}</div>
                        <div className='flex lg:flex-row flex-col items-start lg:items-center gap-1 lg:gap-3 text-sm text-gray-500'>
                          <div className='font-bold text-gray-600'>Interests:</div>{peer.interests.length === 0 ? <div className='text-[14px] text-gray-500'>None</div> : <div className='text-[14px] text-gray-500'>{peer.interests[0]} {peer.interests[1]}</div>}
                        </div>
                      </div>
                    </div>
                  </Link>
                })
            }
          </div>
        </div>

        <div className='w-full lg:w-1/2 rounded-2xl p-4 flex flex-col gap-3 bg-white shadow-xl border border-purple-200'>
          <div className='w-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex flex-col lg:flex-row items-center gap-3 px-3 py-3 sticky top-4 z-10 shadow'>
            <input type='text' value={thought} onChange={(e) => setThought(e.target.value)} placeholder='Write your thoughts...' className='focus:outline-none px-3 py-2 rounded-lg w-full text-gray-700 shadow-sm' />
            <input type='file' multiple id='file' className=' hidden' onChange={(e) => setFiles(e.target.files)} />
            <label htmlFor="file" className='text-white cursor-pointer hover:scale-110 transition'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </label>
            <div onClick={addPost} className='text-white cursor-pointer hover:scale-110 transition'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
          </div>
          <div className='w-full h-full flex flex-col gap-3 overflow-y-auto scrollbar-none max-h-[70vh]'>
            {
              posts.map((post, i) => {
                return <Posts key={i} post={post} />
              })
            }
          </div>
        </div>

        <div className='hidden lg:flex flex-col items-center gap-3 w-full lg:w-1/4 rounded-2xl p-3 bg-white shadow-xl border border-purple-200 overflow-y-auto'>
          <h1 className='text-purple-600 font-bold border-b-2 border-purple-300 w-full text-center pb-2'>FriendList</h1>
          <div className='flex flex-col gap-3 px-3 py-2 w-full'>
            {
              friendList.length === 0 ?
                <div className='w-full text-gray-500 font-bold text-center'>No friends</div> :
                friendList.map((friend, i) => {
                  return <Link key={i} to={`/profile/{friend._id}`} className='w-full flex gap-2 items-center hover:bg-purple-50 p-2 rounded-lg transition'>
                    <div className=' object-cover'>
                      <img className=' border-2 border-purple-400 h-[36px] w-[36px] rounded-full shadow-sm' src={friend.profilepic ? friend.profilepic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                    </div>
                    <div className='text-gray-700 font-bold '>{friend.name}</div>
                  </Link>
                })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Peers

