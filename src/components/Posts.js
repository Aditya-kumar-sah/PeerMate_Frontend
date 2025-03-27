import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useUserContext } from '../context/Usercontext';
import { Link } from 'react-router-dom';

const Posts = (props) => {

  const { user, currUser, setCurrUser } = useUserContext();

  const [postUser, setPostUser] = useState(null);
  const [currIndex, setCurrInd] = useState(0);
  const [like, setLike] = useState(props.post.likes.length)

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
  }, [user])

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/getUser/${props.post.userid}`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`
            }
          }
        )
        setPostUser(userDetails.data);
      } catch (error) {
        alert("Something wrong occurred!")
      }
    }
    getUserDetails();
  }, [user])

  const rightClickHandle = () => {
    let n = props.post.postphoto.length - 1;
    if (currIndex == n) {
      setCurrInd(0);
    }
    else {
      setCurrInd(currIndex + 1);
    }
  }

  const leftClickHandle = () => {
    let n = props.post.postphoto.length - 1;
    if (currIndex == 0) {
      setCurrInd(n);
    }
    else {
      setCurrInd(currIndex - 1);
    }
  }

  const handleLike = async () => {
    try {
      if (props.post.likes.includes(currUser?._id)) {
        await axios.delete(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/post/removeLike/${props.post._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        )

        setLike(like - 1);
      }
      else {
        await axios.put(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/post/addLike/${props.post._id}`, null,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        )

        setLike(like + 1);
      }
    } catch (error) {
      alert("Something wrong occurred!")
    }
  }

  const handledelete = async () =>{
    try {
      await axios.delete(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/post/deletePost/${props.post._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      alert("deleted successfully!") 
    } catch (error) {
      alert("something wrong occurred!")
    }
  }

  return (
    <div className='h-auto border-2 border-gray-200 rounded-md flex flex-col items-center gap-2 w-full px-2 py-3'>
      {
        props.post.postphoto.length > 0 &&
        <>
          <div className='w-full h-[100%] text-center flex  justify-center'>
            <img className='h-[100%] w-[60%] rounded-md' src={props.post.postphoto[currIndex]} />
          </div>
          <div className='w-full flex items-center justify-around'>
            <div onClick={leftClickHandle} className='text-gray-300 cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div onClick={rightClickHandle} className='text-gray-300 cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
        </>
      }
      <div className='w-full font-bold text-gray-600 text-[18px] border-b-2 border-gray-300 p-4 break-words'>{props.post.thought}</div>
      <div className='w-full font-bold text-purple-800 flex lg:flex-row flex-col justify-around items-center gap-1'>
        <div className='flex items-center gap-2'>
          {currUser._id === props.post.userid &&
            <div className='w-full cursor-pointer' onClick={handledelete}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          }
          <div className='flex w-full items-center gap-1'><img onClick={handleLike} className='h-[30px] w-[30px] rounded-full cursor-pointer' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCiAU2q9INi0sCkX_TpkaHBJenlQndUiHwkg&s" /> {like} </div>
        </div>
        <div >Posted by : <Link className='text-[14px] ' to={`/profile/${postUser?._id}`}>{postUser?.name}</Link></div>
      </div>

    </div>
  )
}

export default Posts
