import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useUserContext } from '../context/Usercontext';
import axios from 'axios';

const ProfileUpdate = () => {
  const { user, currUser, setCurrUser } = useUserContext();
  const [email, setEmail] = useState(currUser?.email);
  const [name, setName] = useState(currUser?.name);
  const [branch, setBranch] = useState(currUser?.branch);
  const [bio, setBio] = useState(currUser?.bio || "");
  const [interests, setInterests] = useState([]);
  const [firstInterest, setFirstInterest] = useState(currUser?.interests[0] || "");
  const [secondInterest, setSecondInterest] = useState(currUser?.interests[1] || "");
  const [file, setFile] = useState(null);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setInterests([firstInterest, secondInterest]);
  }, [firstInterest, secondInterest]);

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        try {
          const userCred = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/getUser`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          });
          if (userCred) setCurrUser(userCred.data);
        } catch (error) {
          console.log(error);
          alert("Something wrong occurred!");
        }
      };
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    if (currUser) {
      setEmail(currUser.email || "");
      setName(currUser.name || "");
      setBranch(currUser.branch || "");
      setBio(currUser.bio || "");
      setFirstInterest(currUser.interests[0] || "");
      setSecondInterest(currUser.interests[1] || "");
    }
  }, [currUser]);

  const updateProfile = async () => {
    try {
      const updatedUser = await axios.put(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/updateUser`,
        { name, branch, interests, bio },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      setCurrUser(updatedUser.data);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Something wrong occurred");
    }
  };

  const addPicture = async () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const updatedUser = await axios.put(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/updateProfilePhoto`, formData, {
        headers: { Authorization: `Bearer ${user?.accessToken}`, 'Content-Type': 'multipart/form-data' }
      });
      setCurrUser(updatedUser.data);
      setFile(null);
      setLoading(false)
      alert('Profile picture updated successfully!');
    } catch (error) {
      setLoading(false)
      alert("Something wrong occurred");
    }
  };

   if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-purple-400 fixed inset-0 flex items-center justify-center">
        <div className="text-white font-extrabold text-3xl animate-pulse">Loading...</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200 flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row items-start justify-center gap-6 p-4 lg:p-10 w-full flex-1">

        <div className="bg-white shadow-lg rounded-2xl p-6 w-full lg:w-1/3 flex flex-col items-center gap-6 hover:shadow-2xl transition duration-300">
          <img
            src={currUser?.profilepic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt="Profile"
            className="w-40 h-40 lg:w-56 lg:h-56 rounded-2xl object-cover border-4 border-purple-300"
          />
          <div className="flex flex-col items-center gap-4 w-full">
            <input id="file" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="file" className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white font-bold px-4 py-2 rounded-lg transition">Choose Photo</label>
            <button onClick={addPicture} className="bg-violet-400 hover:bg-violet-500 w-full py-2 rounded-lg font-semibold text-white transition">Upload</button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 flex flex-col gap-6 hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-bold text-purple-700 text-center">Your Profile</h2>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <label className="w-full lg:w-1/4 text-purple-600 font-semibold">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full lg:w-3/4 px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400 transition"/>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <label className="w-full lg:w-1/4 text-purple-600 font-semibold">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full lg:w-3/4 px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400 transition"/>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <label className="w-full lg:w-1/4 text-purple-600 font-semibold">Branch</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full lg:w-3/4 px-4 py-2 rounded-lg bg-gray-100 outline-none cursor-pointer focus:ring-2 focus:ring-purple-400 transition">
              <option value={branch}>{branch}</option>
              <option value="Electrical">Electrical</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Chemical">Chemical</option>
              <option value="Mining">Mining</option>
              <option value="Civil">Civil</option>
              <option value="Metallurgy">Metallurgy</option>
              <option value="Biomed">Biomed</option>
              <option value="Biotech">Biotech</option>
            </select>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <label className="w-full lg:w-1/4 text-purple-600 font-semibold">Bio</label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full lg:w-3/4 px-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400 transition"/>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex flex-col w-full lg:w-1/2 gap-2">
              <label className="text-purple-600 font-semibold">Career Interest</label>
              <select value={firstInterest} onChange={(e) => setFirstInterest(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100 cursor-pointer outline-none focus:ring-2 focus:ring-purple-400 transition">
                <option value={firstInterest}>{firstInterest}</option>
                <option value="SDE">SDE</option>
                <option value="DataAnalyst">Data Analyst</option>
                <option value="GATE">GATE</option>
                <option value="Masters">Masters</option>
                <option value="CivilServices">Civil Services</option>
                <option value="OtherGovtExams">Other Govt Exams</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 gap-2">
              <label className="text-purple-600 font-semibold">Sports Interest</label>
              <select value={secondInterest} onChange={(e) => setSecondInterest(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100 cursor-pointer outline-none focus:ring-2 focus:ring-purple-400 transition">
                <option value={secondInterest}>{secondInterest}</option>
                <option value="Cricket">Cricket</option>
                <option value="BasketBall">Basketball</option>
                <option value="Badminton">Badminton</option>
                <option value="Football">Football</option>
                <option value="Chess">Chess</option>
                <option value="Others">Others</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          <button onClick={updateProfile} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg w-full transition">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
