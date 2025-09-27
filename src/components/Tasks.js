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

  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-400 to-purple-600 fixed inset-0 flex items-center justify-center">
        <div className="text-white font-extrabold text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newTask = await axios.post(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/task/createTask`, {
        heading,
        content
      },
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
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 space-y-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Heading</label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Enter Heading"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter Content"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none min-h-[100px]"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
            >
              Add Task
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
          Authorization: `Bearer ${user?.accessToken}`
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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 space-y-4">
          <div className="flex justify-between">
            <button
              onClick={closeOpenTask}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
            >
              Close
            </button>
            <button
              onClick={deleteTasks}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
            >
              Delete
            </button>
          </div>
          <div className="text-xl font-bold text-gray-800 break-words">{currTask.heading}</div>
          <div className="text-gray-600 break-words">{currTask.content}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={handleAddTask}
          className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          Add Task
        </button>
        <div className="text-xl sm:text-2xl text-purple-700 font-bold text-center">
          Write all important tasks here
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-gray-600 text-lg sm:text-2xl font-semibold text-center">No Tasks for now!</div>
      ) : (
        <div className="grid gap-4 w-full">
          {tasks.map((task, ind) => (
            <div
              key={ind}
              onClick={() => handleOpenTask(task)}
              className="cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-lg sm:text-xl font-bold text-white break-words">{task.heading}</div>
              <div className="text-purple-200 text-sm sm:text-base">
                {task.content.substr(0, 50)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tasks
