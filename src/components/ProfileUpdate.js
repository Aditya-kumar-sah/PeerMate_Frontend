import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useUserContext } from '../context/Usercontext'
import axios from 'axios';

const ProfileUpdate = () => {

    const { user, currUser, setCurrUser } = useUserContext();
    const [email, setEmail] = useState(currUser?.email)
    const [name, setName] = useState(currUser?.name)
    const [branch, setBranch] = useState(currUser?.branch)
    const [bio, setBio] = useState(currUser?.bio || "");
    const [interests, setInterests] = useState([]);
    const [firstInterest, setFirstInterest] = useState(currUser?.interests[0] || "");
    const [secondInterest, setSecondInterest] = useState(currUser?.interests[1] || "");

    const [file, setFile] = useState(null);


    useEffect(() => {
        setInterests([firstInterest, secondInterest]);
    }, [firstInterest, secondInterest])


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
            const updatedUser = await axios.put(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/updateUser`, {
                name,
                branch,
                interests,
                bio
            }
                ,
                {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })

            setCurrUser(updatedUser.data);

        } catch (error) {
            alert("Something wrong occurred")

        }
    }

    const addPicture = async () => {

        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const updatedUser = await axios.put(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/updateProfilePhoto`, formData, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setCurrUser(updatedUser.data);
            setFile(null);
            alert('Profile picture updated successfully!');

        } catch (error) {
            alert("Something wrong occurred")
        }
    }

    return (
        <div className='fixed inset-0 flex flex-col gap-1  overflow-x-hidden'>
            <Header />
            <div className='flex flex-col lg:flex-row items-center p-4 gap-2 h-auto justify-around '>
                <div className='bg-purple-300 p-10 flex flex-col gap-8 rounded-[10px] items-center shadow-lg h-auto overflow-x-auto scrollbar-none w-[40%] max-w-full'>
                    <div className='w-full flex items-center justify-center'>
                        <img className='lg:h-56 lg:w-56  h-32 w-32 rounded-2xl' src={currUser?.profilepic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                    </div>
                    <div className='flex  items-center justify-center gap-4 w-full'>
                        <input className='hidden' id='file' type='file' onChange={(e) => setFile(e.target.files[0])} />
                        <div className='w-full flex items-center justify-center'>
                        <label className=' cursor-pointer' htmlFor='file'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                            </svg>
                        </label>
                        </div>
                        <div className='w-full'><button onClick={addPicture} className='bg-violet-400 w-40 h-32 rounded-lg font-bold text-white hover:shadow-md'>Upload</button></div>
                    </div>
                </div>
                <div className='bg-purple-300 p-8 flex flex-col gap-8 rounded-[10px] shadow-lg h-auto w-[50%] max-w-full overflow-x-auto scrollbar-none'>
                    <div className='flex items-center justify-center w-full'>
                        <div className='text-4xl font-bold text-purple-700 w-full text-center'>Your Profile</div>
                    </div>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center  lg:justify-around gap-2 w-full'>
                        <div className='text-2xl font-bold text-purple-600 w-full lg:w-[20%]'>Email</div>
                        <input className='px-3 py-2 rounded-[5px] bg-gray-200 text-gray-600 w-full lg:w-[80%] outline-none ' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center  lg:justify-around gap-2 w-full'>
                        <div className='text-2xl font-bold text-purple-600 w-full lg:w-[20%]'>Name</div>
                        <input className='px-3 py-2 rounded-[5px] bg-gray-200 text-gray-600 w-full lg:w-[80%] outline-none' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center  lg:justify-around gap-2 w-full'>
                        <div className='text-2xl font-bold text-purple-600 w-full lg:w-[20%]'>Branch</div>
                        <select className='px-3 py-2 rounded-[5px] bg-gray-200 text-gray-600 w-full lg:w-[80%] cursor-pointer' id="dropdown" value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value={branch}>
                                {branch}
                            </option>
                            <option value="Electrical">
                                Electrical
                            </option>
                            <option value="CSE">
                                CSE
                            </option>
                            <option value="IT">
                                IT
                            </option>
                            <option value="Electronics">
                                Electronics
                            </option>
                            <option value="Mechanical">
                                Mechanical
                            </option>
                            <option value="Chemical">
                                Chemical
                            </option>
                            <option value="Mining">
                                Mining
                            </option>
                            <option value="Civil">
                                Civil
                            </option>
                            <option value="Metallurgy">
                                Metallurgy
                            </option>
                            <option value="Biomed">
                                Biomed
                            </option>
                            <option value="Biotech">
                                Biotech
                            </option>
                        </select>
                    </div>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center  lg:justify-around gap-2 w-full'>
                        <div className='text-2xl font-bold text-purple-600 w-full lg:w-[20%]'>Bio</div>
                        <input className='px-3 py-2 rounded-[5px] bg-gray-200 text-gray-600 w-full lg:w-[80%] outline-none' type='text' value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center  lg:justify-around gap-4 w-full'>
                        <div className='flex flex-col lg:flex-row items-start  p-2 lg:items-center gap-2 w-full'>
                            <div className='text-2xl w-full font-bold text-purple-600 '>Career Interest</div>
                            <select className='px-3 py-2 rounded-[5px] bg-gray-200 text-gray-600 w-[100%] cursor-pointer' id="dropdown" value={firstInterest} onChange={(e) => setFirstInterest(e.target.value)}>
                                <option value={firstInterest}>
                                    {firstInterest}
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
                                <option value="None">
                                    None
                                </option>
                            </select>
                        </div>
                        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full'>
                            <div className='text-2xl font-bold text-purple-600 w-full p-2 '>Sports Interest</div>
                            <select className='px-3 py-2 rounded-[5px] bg-gray-200 text-gray-600 w-[100%] cursor-pointer' id="dropdown" value={secondInterest} onChange={(e) => setSecondInterest(e.target.value)}>
                                <option value={secondInterest}>
                                    {secondInterest}
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
                                <option value="Others">
                                    Others
                                </option>
                                <option value="None">
                                    None
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button onClick={updateProfile} className='w-full bg-purple-600 h-[50px] rounded-[5px] text-white font-bold'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUpdate
