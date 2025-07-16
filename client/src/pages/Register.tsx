import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Inputs';
import type { User } from '../interfaces/user';

interface RegisterProps {
  setUser: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
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
      const res = await axios.post("/api/auth/register", formData);
      localStorage.setItem("token", res.data.token)
      setUser(res.data);
      navigate('/')  // Ir al home después del registro exitoso
    } catch (err) {
      window.alert(err)
      console.log(err || "Register Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-200">
        <h2 className="text-center text-2xl font-bold p-8">Registro</h2>
        <form onSubmit={handleSubmit} action="POST" className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <Input
              name="username"
              type="text"
              placeholder="luishsg1"
              value={formData.username}
              className="p-4"
              onChange={handleChange}
              required={true}
            ></Input>
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
            name="register-button"
            className=""
            title="Unirse"
            onClick={() => {}}
          />
        </form>
        <div>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm whitespace-nowrap">
              Ya tienes cuenta? Inicia Sesion
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="text-end">
            <Link to="/login">
              <Button
              name="login-button"
              className=""
              title="Iniciar Sesion"
              onClick={() => navigate('/login')}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default Register