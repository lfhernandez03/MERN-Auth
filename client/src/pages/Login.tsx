import React, { useState } from "react";
import Input from "../components/Inputs";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import type { User } from "../interfaces/user";


interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token)
      setUser(res.data);
      navigate('/')
    } catch (err) {
      console.error("Login error:", err);
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response:", err.response.data);
        alert(`Error: ${err.response.data.message || 'Login failed'}`);
      } else {
        console.error("Network error:", err);
        alert("Network error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-200">
        <h2 className="text-center text-2xl font-bold p-8">Login</h2>
        <form onSubmit={handleSubmit} action="POST" className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formData.email}
              className="p-4"
              onChange={handleChange}
              required={true}
            ></Input>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contrasena
            </label>
            <Input
              name="password"
              type="password"
              placeholder="****"
              value={formData.password}
              className="p-4"
              onChange={handleChange}
              required={true}
            ></Input>
          </div>
          <Button
            name="login-button"
            className=""
            title="Iniciar Sesion"
            onClick={() => {}}
          />
        </form>
        <div>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm whitespace-nowrap">
              O únete a nuestra comunidad
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="text-end">
            <Link to="/register">
              <Button
              name="register-button"
              className=""
              title="Regístrate"
              onClick={() => navigate('/register')}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Login;
