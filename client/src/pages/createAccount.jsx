import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { register } from "../api/users.js";

function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Calculate password strength
  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-500";
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Good";
    return "Strong";
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    {
      text: "Uppercase and lowercase",
      met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
    },
    { text: "At least one number", met: /\d/.test(formData.password) },
    {
      text: "Special character (!@#$%)",
      met: /[^a-zA-Z\d]/.test(formData.password),
    },
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (!formData.agreeTerms) {
        alert("Please agree to the terms and conditions");
        return;
      }
      const res = await register(formData);

      if (res && res.success) {
        console.log("Account created successfully");
        // Optionally, redirect to login page
      } else {
        console.log("Failed to create account");
      }
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center py-12">
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
          className={`text-center mb-10 transition-all duration-1000 ${
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
            Join the Revolution
          </h1>
          <p className="text-gray-400 text-sm">
            Start your journey to ace your exams with AI-powered flashcards
          </p>
        </div>

        {/* Signup Form Card */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-xl">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/0 to-cyan-600/0 hover:from-purple-600/5 hover:to-cyan-600/5 transition-all duration-500 pointer-events-none"></div>

            <form onSubmit={handleSignup} className="relative space-y-5">
              {/* Full Name Input */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-200">
                  Fullname
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="James Smith"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:border-purple-500/50 focus:bg-gray-900/80 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              {/* Username Input */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-200">
                  Username
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="JamesSmith123"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:border-purple-500/50 focus:bg-gray-900/80 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-200">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:border-purple-500/50 focus:bg-gray-900/80 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-200">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          passwordStrength <= 2
                            ? "text-red-400"
                            : passwordStrength <= 3
                              ? "text-yellow-400"
                              : "text-emerald-400"
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>

                    {/* Password Requirements */}
                    <div className="grid grid-cols-2 gap-2">
                      {passwordRequirements.map((req, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 text-xs transition-all duration-300 ${
                            req.met ? "text-emerald-400" : "text-gray-500"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                              req.met
                                ? "bg-emerald-500/20 border-emerald-500"
                                : "border-gray-600"
                            }`}
                          >
                            {req.met && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-200">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:border-purple-500/50 focus:bg-gray-900/80 focus:outline-none text-white placeholder-gray-500 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-400">
                      Passwords do not match
                    </p>
                  )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded mt-0.5 bg-gray-900/50 border border-gray-700/50 cursor-pointer accent-purple-500"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition-colors leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#terms"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.agreeTerms ||
                  formData.password !== formData.confirmPassword
                }
                className="group w-full relative px-6 py-3 font-bold text-base rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white transition-all duration-300 shadow-2xl shadow-purple-600/50 hover:shadow-purple-600/80 hover:scale-105 disabled:scale-100 active:scale-95 overflow-hidden mt-4"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin"></span>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Login Link */}
        <div
          className={`text-center mt-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <a
              href="#login"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Sign in here
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
            Your account is protected with enterprise-grade security
          </span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 text-6xl opacity-10 pointer-events-none">
        🚀
      </div>
      <div className="fixed top-8 left-8 text-6xl opacity-10 pointer-events-none">
        🎓
      </div>
    </div>
  );
}

export default Signup;
