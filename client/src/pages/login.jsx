import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import {login} from "../../api/auth.js";
function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async (e) => {

    console.log("Login attempt with:", formData);
    e.preventDefault();
    setIsLoading(true);
    try{
        const res = await login(formData);
        if(res && res.success){
            // Redirect or perform actions on successful login
            console.log("Login successful:", res);
        }
    }catch(err){
        console.error("Login failed:", err);
    }

  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"
          style={{
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            transform: "translate(-50%, -50%)",
            transition: "all 0.3s ease-out",
          }}
        ></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md px-4 md:px-0">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="inline-block mb-6">
            <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
              Flard
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome Back, Scholar
          </h1>
          <p className="text-gray-400 text-sm">
            Continue your journey to ace your exams
          </p>
        </div>

        {/* Login Form Card */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-xl">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/0 to-cyan-600/0 hover:from-purple-600/5 hover:to-cyan-600/5 transition-all duration-500 pointer-events-none"></div>

            <form onSubmit={handleLogin} className="relative space-y-6">
              {/* Email Input */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-200">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="Enter your username"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:border-purple-500/50 focus:bg-gray-900/80 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-200">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:border-purple-500/50 focus:bg-gray-900/80 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded bg-gray-900/50 border border-gray-700/50 cursor-pointer accent-purple-500"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors"
                >
                  Keep me signed in
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full relative px-6 py-3 font-bold text-base rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white transition-all duration-300 shadow-2xl shadow-purple-600/50 hover:shadow-purple-600/80 hover:scale-105 disabled:scale-100 active:scale-95 overflow-hidden mt-2"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
                <span className="text-xs text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-700"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-900/80 transition-all duration-300"
                >
                  <span className="text-lg">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-900/80 transition-all duration-300"
                >
                  <span className="text-lg">GitHub</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sign Up Link */}
        <div
          className={`text-center mt-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Create one free
            </a>
          </p>
        </div>

        {/* Security Badge */}
        <div
          className={`flex items-center justify-center gap-2 mt-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <svg
            className="w-4 h-4 text-emerald-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
          <span className="text-xs text-gray-500">
            Your data is encrypted and secure
          </span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 text-6xl opacity-10 pointer-events-none">
        ✨
      </div>
      <div className="fixed top-8 left-8 text-6xl opacity-10 pointer-events-none">
        🎮
      </div>
    </div>
  );
}

export default Login;
