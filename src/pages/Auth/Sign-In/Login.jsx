import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Mock API call to validate user credentials
      const response = await fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log(data)
      // Store the token or user info as needed (e.g., in local storage)
      toast.success('Login successful!')
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.data._id);

      // Redirect to a different page on successful login
      navigate("/home"); // Change to your desired route
    } catch (error) {
      toast.error('failed to login', error)
      setError(error.message); // Set error message for display
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md py-8 px-8 rounded-lg dark:rounded-lg shadow-lg dark:bg-base-200">
        {/* Login Header */}
        <h2 className="text-center text-3xl font-bold mb-3">Sign in</h2>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="form-control">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Keep me signed in */}
          <div className="flex justify-between items-center">
            <div>
              <p className="hover:underline text-blue-500 text-sm font-semibold">
                Forgot password?
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 outline-none border-none text-white"
          >
            Sign in
          </button>
        </form>
        <p className="text-end text-sm mb-5 mt-2 px-2">
          Don’t have an account?{" "}
          <Link
            className="text-blue-500 hover:underline font-semibold"
            to="/register"
          >
            Sign up here
          </Link>
        </p>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          ©2024. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
