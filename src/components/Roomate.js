import React, { useState } from 'react';
import Header from "./Header";
import axios from 'axios';
import { useUserContext } from '../context/Usercontext';
import AllRooms from './AllRooms';
import MyRooms from './MyRooms';

const Roomate = () => {
  const { user } = useUserContext();
  const [firstMatch, setFirstMatch] = useState("All");
  const [secondMatch, setSecondMatch] = useState("All");
  const [openForm, setOpenForm] = useState(false);
  const [location, setLocation] = useState("");
  const [features, setFeatures] = useState("");
  const [numberofroomaterequired, setNumberOfroomateRequired] = useState(1);
  const [roomphotos, setRoomPhotos] = useState([]);
  const [phonenumber, setPhoneNumber] = useState("");
  const [loading,setLoading] = useState(false)

  const handleAdd = () => setOpenForm(true);

  const handleCreateRoom = async () => {
    try {
      setLoading(true)
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
      setLoading(false);
      setOpenForm(false);
    } catch (error) {
      setLoading(false)
      alert("Something Wrong Occurred!");
      setOpenForm(false);
    }
  };

   if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-purple-400 fixed inset-0 flex items-center justify-center">
        <div className="text-white font-extrabold text-3xl animate-pulse">Loading...</div>
      </div>
    );
  }


  if (openForm) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-purple-50 bg-opacity-90 z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 flex flex-col gap-6 overflow-y-auto scrollbar-none animate-fadeIn">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-purple-700">Add a Room</h2>
            <button onClick={() => setOpenForm(false)} className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg transition">Close</button>
          </div>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Location" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type="text" placeholder="Features" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none" value={features} onChange={(e) => setFeatures(e.target.value)} />
            <input type="number" placeholder="Roomates Required" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none" value={numberofroomaterequired} onChange={(e) => setNumberOfroomateRequired(e.target.value)} />
            <input type="text" placeholder="Phone Number" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <div className="flex items-center gap-4">
              <input id="file" type="file" multiple className="hidden" onChange={(e) => setRoomPhotos(e.target.files)} />
              <label htmlFor="file" className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition">Upload Photos</label>
              <span className="text-gray-600 font-medium text-sm">You can upload multiple photos</span>
            </div>
            <button onClick={handleCreateRoom} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition">Submit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200 flex flex-col">
      <Header />
      <div className="p-4 lg:p-10 flex flex-col gap-6">
        <div className="bg-purple-400 p-4 lg:p-6 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-4 shadow-md hover:shadow-lg transition">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <select value={firstMatch} onChange={(e) => setFirstMatch(e.target.value)} className="px-4 py-2 rounded-lg bg-white text-gray-700 cursor-pointer w-full">
              <option value="All">Anyone</option>
              <option value="SDE">SDE</option>
              <option value="DataAnalyst">Data Analyst</option>
              <option value="GATE">GATE</option>
              <option value="Masters">Masters</option>
              <option value="CivilServices">Civil Services</option>
              <option value="OtherGovtExams">Other Govt Exams</option>
            </select>
            <select value={secondMatch} onChange={(e) => setSecondMatch(e.target.value)} className="px-4 py-2 rounded-lg bg-white text-gray-700 cursor-pointer w-full">
              <option value="All">Anyone</option>
              <option value="Cricket">Cricket</option>
              <option value="BasketBall">Basketball</option>
              <option value="Badminton">Badminton</option>
              <option value="Football">Football</option>
              <option value="Chess">Chess</option>
            </select>
          </div>
          <div className="text-white font-semibold text-center text-lg lg:text-xl">Find your perfect roommate with matching interests!</div>
          <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition">Add Room</button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 overflow-y-auto scrollbar-none animate-fadeIn">
            <AllRooms matches={{ firstMatch, secondMatch }} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 overflow-y-auto scrollbar-none animate-fadeIn">
            <MyRooms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roomate;
