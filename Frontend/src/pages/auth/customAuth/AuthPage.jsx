import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignInSubmit = async (event) => {
    setSignInError("");
    event.preventDefault();
    const { email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      console.log("Login Started in Frontend");
      const user = await loginUser(data);
      console.log("Login Completed");

      if (user?.statusCode === 200) {
        navigate("/");
      }
      console.log(user);
    } catch (error) {
      setSignInError(error.message);
      console.log("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    setSignUpError("");
    event.preventDefault();
    const { fullname, email, password } = event.target.elements;

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    console.log("User Registration Started");
    const data = {
      fullName: fullname.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await registerUser(data);
      if (response?.statusCode === 201) {
        console.log("User Registration Started");
        handleSignInSubmit(event);
      }
    } catch (error) {
      console.log("User Registration Failed");
      setSignUpError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <motion.div
        className="relative w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/70"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            {isSignUp ? "Welcome" : "Welcome back"}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {isSignUp ? "Sign up to ResuMate" : "Sign in to ResuMate"}
            </span>
          </h1>
          <p className="mt-2 text-xs text-gray-500">
            Continue crafting AI-powered resumes with a clean, focused workspace.
          </p>
        </div>

        <div className="mb-5 flex justify-around rounded-2xl bg-slate-50 p-1">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              !isSignUp
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/40"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <FaSignInAlt />
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              isSignUp
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/40"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <FaUserPlus />
            Sign Up
          </button>
        </div>

        <div className="relative rounded-2xl border border-slate-100 bg-slate-50/60 p-4 min-h-[20rem]">
          <motion.div
            className={`absolute inset-0 transition-transform duration-500 ${
              isSignUp ? "translate-x-0" : "translate-x-full"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isSignUp ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-center text-lg font-semibold text-slate-900">
              Create your account
            </h2>
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <FaUser className="mr-2 text-slate-400" />
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  required
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <FaUser className="mr-2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <FaLock className="mr-2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/40 transition-colors hover:bg-blue-500"
              >
                {loading ? (
                  <Loader2 className=" animate-spin text-center" />
                ) : (
                  "Register User"
                )}
              </button>
              {signUpError && (
                <div className="mt-2 text-center text-xs text-red-500">
                  {signUpError}
                </div>
              )}
            </form>
          </motion.div>
          <motion.div
            className={`absolute inset-0 transition-transform duration-500 ${
              isSignUp ? "-translate-x-full" : "translate-x-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: !isSignUp ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-center text-lg font-semibold text-slate-900">
              Sign in to continue
            </h2>
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <FaUser className="mr-2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <FaLock className="mr-2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/40 transition-colors hover:bg-blue-500"
              >
                {loading ? (
                  <Loader2 className=" animate-spin text-center" />
                ) : (
                  "Login"
                )}
              </button>
              {signInError && (
                <div className="mt-2 text-center text-xs text-red-500">
                  {signInError}
                </div>
              )}
            </form>
          </motion.div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-500 hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}

export default AuthPage;

