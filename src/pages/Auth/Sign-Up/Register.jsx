import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

     if (password !== confirmPassword) {
       setError("Passwords do not match");
       return;
     }


    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("bio", bio);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:7000/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccessMessage("Registration successful! Please log in.");
      toast.success("Registration successful!");
      navigate("/");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setBio("");
      setImage(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md py-8 px-8 rounded-lg dark:rounded-lg shadow-lg dark:bg-base-200 ">
        <h2 className="text-center text-3xl font-bold mb-3">Sign up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control dracula:rounded-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control dracula:rounded-lg">
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="form-control">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="input input-bordered w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-control dracula:rounded-lg">
            <textarea
              placeholder="Enter your bio"
              className="textarea textarea-bordered w-full"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="form-control dracula:rounded-lg">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 outline-none border-none text-white"
          >
            Sign me up
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
        </form>
        <p className="text-center text-sm mb-5 mt-2 px-2">
          Already have an account?
          <Link className="text-blue-500 hover:underline font-semibold" to="/">
            {" "}
            Sign in here
          </Link>
        </p>
        <p className="mt-6 text-center text-xs text-gray-500">
          ©2024. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Register;
