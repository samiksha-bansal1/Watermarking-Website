import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const provider = new GoogleAuthProvider();

function AuthWindow() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome, ${result.user.displayName}`);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed.");
      console.error(error);
    }
  };

  const handleEmailAuth = async () => {
    try {
      // Try logging in
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome back, ${result.user.email}`);
      setUser(result.user);
      navigate("/");
    } catch (loginError) {
      if (loginError.code === "auth/user-not-found") {
        try {
          // If user doesn't exist, sign them up
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          toast.success(`Account created! Welcome, ${result.user.email}`);
          setUser(result.user);
          navigate("/");
        } catch (signupError) {
          toast.error(signupError.message);
        }
      } else {
        toast.error(loginError.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Welcome to MarkProof
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring"
        />

        <button
          onClick={handleEmailAuth}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full mb-4"
        >
          Continue with Email
        </button>

        <div className="text-gray-500 my-2">or</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50 text-gray-800 font-medium"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-6 w-6"
          />
          Continue with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}

export default AuthWindow;
