import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/Usercontext'

const LoginPage = () => {
  const { user, loginUser } = useUserContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmitEmailAndPassword = async () => {
    try {
      await loginUser(email, password)
    } catch (error) {
      console.log(error)
      alert("Login failed!")
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/home")
    }
  }, [user, navigate])

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center gap-6">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl text-center">
          Welcome Back 
        </h1>
        <p className="text-gray-200 text-sm sm:text-base text-center">
          Login to continue to PeerMate
        </p>

        <div className="w-full">
          <input
            className="px-4 py-3 rounded-xl w-full outline-none bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-purple-300 transition border border-white/30 text-sm sm:text-base"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
          />
        </div>

        <div className="w-full">
          <input
            className="px-4 py-3 rounded-xl w-full outline-none bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-purple-300 transition border border-white/30 text-sm sm:text-base"
            placeholder="Password (at least 6 chars)"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
          />
        </div>

        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold text-base sm:text-lg shadow-lg transition"
          onClick={handleSubmitEmailAndPassword}
        >
          Login
        </button>

        <div className="text-gray-200 text-xs sm:text-sm font-medium text-center">
          Not Registered?{" "}
          <Link
            className="text-yellow-300 hover:underline font-semibold"
            to="/"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
