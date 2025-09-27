import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "../firebaseConfig/Firebase"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../context/Usercontext';

const auth = getAuth(app);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [yearofpassout, setYearOfPassout] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/home")
    }
  }, [user, navigate])

  const handleSubmitEmailAndPassword = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKENDURL}/api/v1/2024/user/register`, {
        email, name, branch, yearofpassout
      })
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login")
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Registeration failed!")
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-purple-400 fixed inset-0 flex items-center justify-center">
        <div className="text-white font-extrabold text-2xl sm:text-3xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 px-3 sm:px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-5 sm:gap-6">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">Register</h2>

        <input
          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl w-full outline-none bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-300 text-sm sm:text-base"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
        />
        <input
          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl w-full outline-none bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-300 text-sm sm:text-base"
          placeholder="Password (at least 6 chars)"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
        />
        <input
          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl w-full outline-none bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-300 text-sm sm:text-base"
          placeholder="Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          name="name"
        />
        <input
          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl w-full outline-none bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-300 text-sm sm:text-base"
          placeholder="Branch"
          type="text"
          value={branch}
          onChange={e => setBranch(e.target.value)}
          name="branch"
        />
        <input
          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl w-full outline-none bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-300 text-sm sm:text-base"
          placeholder="Year of passout"
          type="number"
          value={yearofpassout}
          onChange={e => setYearOfPassout(e.target.value)}
          name="yearofpassout"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold sm:font-bold py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-md text-sm sm:text-base"
          onClick={handleSubmitEmailAndPassword}
        >
          Register
        </button>

        <p className="text-white text-center text-sm sm:text-base">
          Already Registered?{" "}
          <Link to="/login" className="text-yellow-300 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
