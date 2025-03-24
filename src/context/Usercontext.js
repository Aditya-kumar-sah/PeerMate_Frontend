import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebaseConfig/Firebase"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"


const auth = getAuth(app)



const userContext = createContext(null);

export const useUserContext = () => useContext(userContext)


export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(false);
    const [currUser,setCurrUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, u => {
            if (u) {
                setUser(u);
            }
            else {
                setUser(null);
            }
        })
    }, [])

    const loginUser = (email,password) =>{
           return signInWithEmailAndPassword(auth, email, password);
    }

    const logoutUser = () =>{
        return signOut(auth)
    }

    return (
        <userContext.Provider value={{ user,setUser,loginUser,logoutUser,loading,setLoading,currUser,setCurrUser}}>
            {children}
        </userContext.Provider>
    )


}