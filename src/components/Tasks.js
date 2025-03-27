import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/Usercontext'
import axios from "axios";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useUserContext();
    const [openForm, setOpenForm] = useState(false);
    const [openTask, setOpenTask] = useState(false);

    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");

    const [currTask, setCurrTask] = useState(null);

    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            if (user) {
                try {
                    const allTasks = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/task/getTasks`, {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`,
                        },
                    })
                    setTasks(allTasks.data);
                } catch (error) {
                    alert("Something wrong occurred!")
                }
            }
        }
        fetchTasks();
    }, [])

    const handleAddTask = () => {
        setOpenForm(true);
    }


    if(loading){
        return (
            <div className='bg-purple-400 fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center'>
                 <div className='text-white font-bold text-2xl'>Loading...</div>
            </div>
        );
    }


    const handleSubmit = async () => {
        try {
            setLoading(true);
            const newTask = await axios.post(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/task/createTask`, {
                heading,
                content
            }
                ,
                {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`  
                    }
                }
            )
            setTasks([...tasks, newTask.data]);
            setContent("");
            setHeading("");
            setOpenForm(false);
            setLoading(false);
        } catch (error) {
            setOpenForm(false);
            setContent("");
            setHeading("");
            setLoading(false);
            alert("Something wrong occurred!")
        }
    }

    const handleClose = () => {
        setOpenForm(false);
    }

    if (openForm) {
        return (
            <div className='fixed inset-0 bg-slate-300 p-5 flex flex-col justify-center items-center rounded-[10px] shadow-xl '>
                <div className='fixed right-[8%] top-[8%]  cursor-pointer ' onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className=' p-10 bg-gray-300 rounded-md shadow-2xl flex flex-col  justify-around w-[70%] h-[90%]'>
                    <div className='flex flex-col items-start justify-center gap-1'>
                        <div className='font-bold text-gray-500 text-xl'>Heading</div>
                        <input type='text' value={heading} onChange={(e) => setHeading(e.target.value)} placeholder='Enter Heading' className='border border-blue-600 px-3 py-2  rounded-[5px] w-full outline-none' />
                    </div>
                    <div className='flex flex-col items-start justify-center gap-1'>
                        <div className='font-bold text-gray-500 text-xl'>Content</div>
                        <input type='text' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Enter Content' className='border border-blue-600 px-3 py-2 rounded-[5px] w-full  outline-none' />
                    </div>
                    <div>
                        <button onClick={handleSubmit} className='border  border-gray-500 bg-blue-600 text-white font-bold px-3 py-2 rounded-[5px] w-full'>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const handleOpenTask = (task) => {
        setOpenTask(true);
        setCurrTask(task);
    }

    const closeOpenTask = () => {
        setOpenTask(false);
        setCurrTask(null);
    }

    const deleteTasks = async () => {
        try {
            setLoading(true);
            const newTasks = await axios.delete(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/task/deleteTask/${currTask._id}`, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`  // Add the Authorization header
                }
            })
            setTasks(newTasks.data);
            setLoading(false);
            setOpenTask(false);
            setCurrTask(null);
        } catch (error) {
            setLoading(false);
            alert("Something wrong occurred!");
        }
    }

    if (openTask) {
        return (
            <div className='fixed inset-0 bg-gray-300 flex items-center justify-center'>
              <div className=' flex flex-col bg-purple-500 px-5 py-3 gap-2 rounded-[5px] justify-start items-start h-[90%] sm:h-auto w-[50%] overflow-y-auto overflow-x-auto scrollbar-none '>
                <div className='flex flex-row  justify-around sm:justify-start gap-4 sm:items-center w-full '>
                    <div><button onClick={closeOpenTask} className=' bg-purple-700 text-white font-bold px-3 py-2 rounded-[5px]'>Close</button></div>
                    <div><button onClick={deleteTasks} className=' bg-purple-700 text-white font-bold px-3 py-2 rounded-[5px]'>Delete</button></div>
                </div>
                <div className='font-bold text-2xl text-white w-full break-words '>{currTask.heading}</div>
                <div className='font-bold text-purple-300 w-full break-words'>{currTask.content}</div>
              </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-start justify-between gap-6 w-[100%] '>
            <div className='w-[100%] flex items-center gap-4'>
              <div className='w-[50%] text-center '><button onClick={handleAddTask} className='border border-gray-500 bg-blue-600 text-white font-bold px-3 py-2 rounded-[5px]'>Add task</button></div>
              <div className='text-2xl text-center  text-purple-600 font-mono font-bold w-[50%] '>Write all important tasks here</div>
            </div>

            {
                (tasks.length === 0) ? <div className='font-bold text-gray-600 text-2xl w-full text-center'>No Tasks for now!</div> : (
                    tasks.map((task, ind) => {
                        return (
                            <div onClick={() => handleOpenTask(task)} className='flex flex-col bg-purple-500 px-3 py-2 rounded-[5px] w-[550px] cursor-pointer'>
                                <div className='font-bold text-2xl text-white '>{task.heading}</div>
                                <div className='font-bold text-purple-300'>{task.content.substr(0, 50)}...</div>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default Tasks
