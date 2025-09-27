import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Header';
import Profile from '../components/Profile';

const HomePage = () => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (!user) {
        navigate("/login")
      } else {
        setLoading(false);
      }
    }, 1000)
  }, [user, navigate])

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-purple-400 fixed inset-0 flex items-center justify-center">
        <div className="text-white font-extrabold text-3xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <Header />
      <main className="flex-grow flex justify-center items-start px-4 sm:px-6 lg:px-12 py-6">
        <Profile />
      </main>
      <footer className="bg-gradient-to-r from-purple-600 to-purple-500 w-full py-6 flex items-center justify-center text-white font-semibold text-lg sm:text-xl rounded-t-md shadow-inner">
        @AdityaTech
      </footer>
    </div>
  )
}

export default HomePage

