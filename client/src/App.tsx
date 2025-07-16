import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import axios from 'axios'
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useEffect, useState } from "react"
import type { User } from "./interfaces/user"

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(()=>{
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get('/api/auth/me',{
            headers: {Authorization:  `Bearer ${token}`}
          });
          setUser(res.data)
        } catch (err) {
          setError("Failed to fetch user data");
          localStorage.removeItem('token')
          console.log(err)
        }
      }
    };
    fetchUser();
  }, []); 

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Router>
  )
}

export default App
