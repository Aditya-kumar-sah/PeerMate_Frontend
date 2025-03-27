import React, { useState } from 'react'
import Header from "./Header"
import axios from 'axios';
import { useUserContext } from '../context/Usercontext';
import AllRooms from './AllRooms';
import MyRooms from './MyRooms';

const Roomate = () => {

  const { user } = useUserContext();

  const [firstMatch, setFirstMatch] = useState("All");
  const [secondMatch, setSecondMatch] = useState("All");
  const [opeanForm, setOpenForm] = useState(false);



  const [location, setLocation] = useState("");
  const [features, setFeatures] = useState("");
  const [numberofroomaterequired, setNumberOfroomateRequired] = useState(1);
  const [roomphotos, setRoomPhotos] = useState([]);
  const [phonenumber, setPhoneNumber] = useState("");

  const handleAdd = () => {
    setOpenForm(true);
  }

  const handleCreateRoom = async () => {
    try {
      const formData = new FormData();

      formData.append("location", location);
      formData.append("features", features);
      formData.append("numberofroomaterequired", numberofroomaterequired);
      formData.append("phonenumber", phonenumber);

      for (let i = 0; i < roomphotos.length; i++) {
        formData.append("files", roomphotos[i]);
      }

      await axios.post(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/roomate/create`, formData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setOpenForm(false);
    } catch (error) {
      alert("Something Wrong Occurred!");
      setOpenForm(false);
    }
  }



  if (opeanForm) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-purple-200'>
        <div className='flex flex-col gap-5 items-start h-[90%] lg:h-auto w-[90%] sm:w-auto bg-purple-300 p-4 rounded-[5px] shadow-md hover:shadow-xl transition overflow-y-auto scrollbar-none'>
          <div>
            <button onClick={() => setOpenForm(false)} className='bg-purple-800 text-white px-3 py-2 rounded-[5px]'>Close</button>
          </div>
          <div className='flex flex-col items-start gap-6 w-full'>
            <div className='flex gap-1 items-center  w-full'>
              <div className='text-gray-600 font-bold text-xl w-full'>Enter Location: </div>
              <input className='px-3 py-2 rounded-[5px] w-full outline-none' type='text' value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className='flex gap-1 items-center  w-full'>
              <div className='text-gray-600 font-bold text-xl w-full'>Enter features: </div>
              <input className='px-3 py-2 rounded-[5px] w-full outline-none' type='text' value={features} onChange={(e) => setFeatures(e.target.value)} />
            </div>
            <div className='flex gap-1 items-center  w-full'>
              <div className='text-gray-600 font-bold text-xl w-full'>Roomate required: </div>
              <input className='px-3 py-2 rounded-[5px] w-full outline-none' type='number' value={numberofroomaterequired} onChange={(e) => setNumberOfroomateRequired(e.target.value)} />
            </div>
            <div className='flex gap-1 items-center  w-full'>
              <div className='text-gray-600 font-bold text-xl w-full'>Phone number: </div>
              <input className='px-3 py-2 rounded-[5px] w-full outline-none' type='text' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className='flex gap-1 justify-around items-center  w-full'>
              <input id='file' className='hidden' type='file' multiple onChange={(e) => setRoomPhotos(e.target.files)} />
              <label htmlFor='file' className=' cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </label>
              <div className='text-gray-800 font-bold'>User can upload multiple photos!</div>
            </div>
            <div className='w-full'>
              <button onClick={handleCreateRoom} className='bg-purple-500 text-white px-3 py-2 rounded-md w-full'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className='h-auto w-full  flex flex-col'>
      <Header />
      <div className='h-auto'>
        <div className='bg-purple-400 h-auto p-5 flex flex-col lg:flex-row gap-3 lg:justify-between justify-center items-center'>
          <div className='flex flex-col lg:flex-row gap-2 items-center'>
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
          <div className='text-white font-bold text-xl font-mono w-full lg:w-auto text-center'>
            Find your perfect roomate, with matching interests!
          </div>
          <div><button onClick={handleAdd} className='bg-blue-600 text-gray-300 font-bold text-xl px-3 py-2 rounded-[5px]'>Add room</button></div>
        </div>
        <div className='flex lg:flex-row flex-col gap-4 p-3 w-full h-auto items-center justify-around'>
          <div className=' bg-purple-300 p-10 flex flex-col gap-2 rounded-[10px] shadow-lg h-auto w-full overflow-y-auto scrollbar-none '>
            <AllRooms matches={{ firstMatch, secondMatch }} />
          </div>
          <div className=' bg-purple-300 p-10 flex flex-col gap-2 rounded-[10px] shadow-lg h-auto w-full overflow-y-auto scrollbar-none'>
            <MyRooms />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roomate
