import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helper/axios";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/users/login`, {
        username,
        password,
      });
      const { token } = response.data;
      sessionStorage.setItem("authToken", token);
      navigate("/");
      document.location.reload();
    } catch (err) {
      setError("Credenciales inválidas. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        <p className=" mb-2">
          Si no tienes una cuenta, puedes contactar al administrador
          <hr />
          <br />
        </p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-12">
          <label className="block text-sm font-medium mb-2">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
