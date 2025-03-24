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
  const [posts,setPosts] = useState([]);
  const [friendList,setFriendList] = useState([]);

  const [peersWithSameInterests, setPeersWithSameInterests] = useState([]);


  useEffect(()=>{
     if(user){
        const getAllPost = async () =>{
          try {
            const allPosts = await axios.get("/post/getAllPost",
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
  },[user])


  const addPost = async () =>{
    if(!thought && !files){
      alert("Please attach something to post");
      return;
    } 

    const formData = new FormData();

    if(files.length != 0){
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    } 
    else formData.append('files', []);

    formData.append('thought', thought);
    
    try {
        await axios.post("/post/uploadPost", formData, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,  
                'Content-Type': 'multipart/form-data'        
            }
        });
        
        setThought("");
        setFiles([]);
        
        alert('posted successfully!');
            
    } catch (error) {
         alert("Something wrong occurred")
    }
}


  useEffect(() => {
    if (user) {
      const fetchPeers = async () => {
        try {
          const peers = await axios.get(`/user/getPeer/${firstMatch}/${secondMatch}`,
            {
              headers: {
                Authorization: `Bearer ${user?.accessToken}`
              }
            })
          setPeersWithSameInterests(peers.data);
        } catch (error) {
          alert("Something wrong occurred!")
          setPeersWithSameInterests([]);
          console.log(error);
        }
      }
      fetchPeers();
    }
  }, [firstMatch, secondMatch, user])


  useEffect(()=>{
    if(user){
      const fetchFriends = async () =>{
           try {
            const friends = await axios.get("/user/getFriend",
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
  },[user])


  return (
    <div className='h-screen w-full flex flex-col'>
      <Header />
      <div className='bg-gray-200 h-[90%] w-full flex items-center gap-2 justify-center p-6 '>
        <div className='bg-purple-300 flex flex-col items-center gap-2 h-[100%] w-[50%] lg:w-[30%] rounded-md  shadow-xl hover:shadow-2xl p-5'>
          <div className='flex gap-2 items-center'>
            <div className='w-full'>
              <select className='px-3 py-2 rounded-[5px] bg-gray-200 text-gray-600 w-[100%] cursor-pointer' value={firstMatch} onChange={(e) => setFirstMatch(e.target.value)} id="dropdown" >
                <option value="All">
                  AnyOne
                </option>
                <option value="SDE">
                  SDE
                </option>
                <option value="DataAnalyst">
                  DATA ANALYST
                </option>
                <option value="GATE">
                  GATE
                </option>
                <option value="Masters">
                  Masters
                </option>
                <option value="CivilServices">
                  Civil Services
                </option>
                <option value="OtherGovtExams">
                  OtherGovtExams
                </option>
              </select>
            </div>
            <div className='w-full'>
              <select className='px-3 py-2 rounded-[5px] bg-gray-200 text-gray-600 w-[100%] cursor-pointer' value={secondMatch} onChange={(e) => setSecondMatch(e.target.value)} id="dropdown" >
                <option value="All">
                  AnyOne
                </option>
                <option value="Cricket">
                  Cricket
                </option>
                <option value="BasketBall">
                  BasketBall
                </option>
                <option value="Badminton">
                  Badminton
                </option>
                <option value="Football">
                  Football
                </option>
                <option value="Chess">
                  Chess
                </option>
              </select>
            </div>
          </div>
          <div className='bg-gray-200 flex flex-col gap-3 items-start w-full px-3 pt-8 rounded-md h-full overflow-y-auto  scrollbar-none'>
            {
              (peersWithSameInterests.length === 0) ? <div className='text-center text-white font-bold break-words w-full'>No such peer present!</div> :
                peersWithSameInterests.map((peer, ind) => {
                  return<Link to={`/profile/${peer._id}`} className='w-full p-1'> <div className='w-full flex flex-col items-center gap-2 hover:shadow-lg cursor-pointer bg-blue-400 px-3 py-2 rounded-md overflow-x-auto scrollbar-none'>
                    <div className='flex items-center gap-4 w-full'>
                      <div className='hidden lg:block'><img className=' h-[40px] w-[40px] object-cover rounded-full border-[2px] border-white' src={peer.profilepic ? peer.profilepic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} /></div>
                      <div className='font-bold flex flex-col items-start text-gray-600'>
                        <div className='text-xl font-bold'>{peer.name}</div>
                        <div className='flex lg:flex-row flex-col items-start lg:items-center gap-1 lg:gap-3'>
                          <div className='font-bold text-gray-700'>Interests:</div>{peer.interests.length === 0 ? <div className='text-[14px] text-gray-500'>None</div> : <div className='text-[14px] text-gray-500'>{peer.interests[0]} {peer.interests[1]}</div>}
                        </div>
                      </div>
                    </div>

                  </div>
</Link>
                })
            }
          </div>
        </div>
        <div className='bg-purple-400 h-[100%] w-[50%] rounded-md p-4 flex flex-col items-center gap-3 shadow-xl hover:shadow-2xl'>
          <div className='w-full bg-purple-600 sticky flex lg:flex-row flex-col items-center justify-center rounded-md gap-8 px-3 p-4 border-b-2 border-gray-300'>
            <input type='text' value={thought} onChange={(e) => setThought(e.target.value)} placeholder='Write your thoughts' className='focus:outline-none px-3 py-2 rounded-md w-[80%] text-gray-500' />
            <input type='file' multiple id='file' className=' hidden' onChange={(e) => setFiles(e.target.files)} />
            <label for="file" className='text-white cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </label>
            <div onClick={addPost} className='text-gray-600 cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
          </div>
          <div className='w-full p-4 h-full flex flex-col  gap-2 overflow-y-scroll scrollbar-none'>
             {
              posts.map((post) => {
                return <Posts post={post}/>
             })
             }
          </div>
        </div>
        <div className='  bg-blue-400 h-[100%] w-[20%] hidden md:block lg:flex flex-col items-center py-3 px-2 rounded-md  shadow-xl hover:shadow-2xl'>
              <h1 className='text-white font-bold border-b-2 border-gray-400 w-full text-center pb-2'>FriendList</h1>
              <div className='flex flex-col gap-3 px-3 py-2  w-full '>
                 {
                  friendList.length === 0 ? 
                    <div className='w-full text-white font-bold text-center'>
                       No friends
                    </div> :
                    friendList.map((friend) => {
                        return <Link to={`/profile/${friend._id}`} className='w-full flex gap-2 items-center'>
                            <div className=' object-cover hidden lg:block'><img className=' border border-gray-300 h-[30px] w-[30px] rounded-full' src={friend.profilepic ? friend.profilepic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} /></div>
                            <div className='text-white font-bold '>{friend.name}</div>
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
