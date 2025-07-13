import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // Assuming firebase.js is in the parent directory
import { toast } from "react-toastify";

function SignupModal({ onClose, onSwitchToLogin }) {
  const [name, setName] = useState(""); // New state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password

  const handleSignup = async (e) => {
    e.preventDefault();

    // Password confirmation validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return; // Stop the signup process
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with the provided name
      if (user && name) {
        await updateProfile(user, { displayName: name });
      }

      toast.success("Account created successfully! You are now logged in.");
      onClose(); // Close the modal on successful signup
    } catch (err) {
      let errorMessage = "Failed to create account.";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use. Please log in instead.";
        toast.error(errorMessage);
        // Automatically switch to login modal after a short delay
        setTimeout(() => onSwitchToLogin(), 1500);
      } else if (err.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please use at least 6 characters.";
        toast.error(errorMessage);
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
        toast.error(errorMessage);
      } else {
        toast.error(errorMessage + " " + err.message);
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      // For Google signup, Firebase automatically populates displayName from Google profile
      toast.success("Account created with Google successfully!");
      onClose(); // Close the modal on successful Google signup
    } catch (err) {
      toast.error("Google signup failed: " + err.message);
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
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="John Doe"
            />
          </div>

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
              placeholder="•••••••• (min 6 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 relative">
          <span className="bg-white px-2 z-10 relative">or</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>
        <button
          onClick={handleGoogleSignup}
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 px-4 rounded-md hover:bg-gray-50 transition duration-300 ease-in-out font-medium text-gray-700 shadow-sm"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Sign up with Google
        </button>
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline font-medium"
          >
            Log In
          </button>
        </div>
        {/* Removed the old Cancel button */}
        {/*
        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 hover:underline transition duration-200"
        >
          Cancel
        </button>
        */}
      </div>
    </div>
  );
}

export default SignupModal;
