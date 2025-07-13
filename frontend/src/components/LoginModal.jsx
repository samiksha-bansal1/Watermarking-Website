import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // Assuming firebase.js is in the parent directory
import { toast } from "react-toastify";

function LoginModal({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      onClose(); // Close the modal on successful login
    } catch (err) {
      // Display specific error messages to the user
      let errorMessage = "Failed to log in. Please check your credentials.";
      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      } else if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      }
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google successfully!");
      onClose(); // Close the modal on successful Google login
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 font-sans">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200 relative">
        {" "}
        {/* Added relative for positioning cross button */}
        {/* Cross icon for closing the modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times; {/* HTML entity for multiplication sign (x) */}
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold shadow-md"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600 relative">
          <span className="bg-white px-2 z-10 relative">or</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 px-4 rounded-md hover:bg-gray-100 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Log in with Google
        </button>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </button>
        </div>
        {/* Removed the old Cancel button */}
        {/*
        <button
          onClick={onClose}
          className="mt-6 w-full text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
        */}
      </div>
    </div>
  );
}

export default LoginModal;
