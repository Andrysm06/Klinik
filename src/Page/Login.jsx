import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../public/Image/LgHBP2.png";
import BgMobil from "../../public/Image/BgMobil2.jpeg";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    setTimeout(() => {
      // ADMIN
      if (username === "hbp" && password === "hbp") {
        localStorage.setItem("login", "true");
        localStorage.setItem("role", "admin");

        setMessage("Login berhasil sebagai Admin");
        navigate("/Beranda");
      }

      // USER
      else if (username === "user" && password === "user") {
        localStorage.setItem("login", "true");
        localStorage.setItem("role", "user");

        setMessage("Login berhasil sebagai User");
        navigate("/Beranda");
      } else {
        setMessage("Username atau password salah");
      }

      setLoading(false);
    }, 1200);
  };
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BgMobil})`,
          filter: "blur(4px)",
        }}
      ></div>

      <div className="relative z-10 bg-white bg-opacity-50 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <img src={Logo} alt="Klinik Logo" className="w-24 h-27 mx-auto" />
            <h1 className="text-2xl font-semibold text-gray-800 mt-4">Login</h1>
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition duration-300 ${
              loading
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-red-700 text-white hover:bg-red-800"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {message && (
            <div
              className={`mt-4 p-2 text-center rounded-lg text-sm ${
                message === "Berhasil login"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
