import Peers from "./components/Peers";
import ProfileUpdate from "./components/ProfileUpdate";
import Roomate from "./components/Roomate";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Room from "./pages/Room";
import UserProfile from "./pages/UserProfile";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/profileUpdate" element={<ProfileUpdate/>} />
          <Route path="/peers" element={<Peers/>} />
          <Route path="/roomate" element={<Roomate/>} />
          <Route path="/room/:id" element={<Room/>} />
          <Route path="/profile/:id" element={<UserProfile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
