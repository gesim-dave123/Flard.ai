import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import HowItWorks from "./howItWorks.jsx";

function Landing() {
  const [isVisible, setIsVisible] = useState(false);
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

  const features = [
    {
      icon: "📁",
      title: "Upload Files",
      desc: "Drop any document and watch the magic happen",
      delay: 0,
    },
    {
      icon: "✨",
      title: "AI Flashcards",
      desc: "Intelligent cards generated in seconds",
      delay: 100,
    },
    {
      icon: "🏆",
      title: "Earn XP & Level Up",
      desc: "Gamified learning with real progression",
      delay: 200,
    },
  ];

  const stats = [
    { value: "50K+", label: "Students Studying" },
    { value: "1M+", label: "Flashcards Generated" },
    { value: "95%", label: "Pass Rate Improvement" },
  ];

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <Navbar />

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

      {/* Hero Section */}
      <main className="relative pt-40 px-4 pb-24 md:pb-32 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div
            className={`flex justify-center mb-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-300">
                Join the learning revolution
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Forge Your Knowledge
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              Upload your study materials, let AI generate intelligent
              flashcards, and dominate your exams. Earn XP, level up, and
              compete on the leaderboard.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <button className="group relative px-8 py-4 font-bold text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300 shadow-2xl shadow-purple-600/50 hover:shadow-purple-600/80 hover:scale-105 active:scale-95">
              <span className="relative flex items-center gap-2 justify-center">
                🚀 Start Learning Free
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            <button className="group relative px-8 py-4 font-bold text-lg rounded-xl border-2 border-gray-600 hover:border-gray-400 text-white transition-all duration-300 hover:bg-white/5">
              <span className="flex items-center gap-2 justify-center">
                Watch Demo
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-3 gap-4 md:gap-8 mt-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-2xl md:text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-20 md:py-32">
        <div
         className={`max-w-6xl mx-auto  transition-all duration-1000 ${
           isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Three simple steps to ace your exams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:translate-y--2"
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/10 group-hover:to-cyan-600/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>        
      </section >

      {/* Gamification Highlight */}
      <section className="relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Level Up Your Learning
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Every correct answer earns you XP. Climb the leaderboard. Unlock
                achievements. Transform studying from a chore into an addictive
                game.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-semibold">Instant Feedback</p>
                    <p className="text-sm text-gray-400">
                      Know your progress immediately
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
                  <span className="text-2xl">🏅</span>
                  <div>
                    <p className="font-semibold">Achievements Unlocked</p>
                    <p className="text-sm text-gray-400">
                      Earn badges as you progress
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <p className="font-semibold">Global Leaderboard</p>
                    <p className="text-sm text-gray-400">
                      Compete with students worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-900/50 to-cyan-900/50 border border-purple-500/30 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-cyan-600/0 group-hover:via-purple-600/10 transition-all duration-500"></div>

                {/* Animated stats */}
                <div className="relative z-10 text-center space-y-6">
                  <div className="text-6xl font-black text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text animate-pulse">
                    Level 42
                  </div>
                  <div className="text-lg text-gray-300">
                    12,450 XP this week
                  </div>
                  <div className="w-48 h-3 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-purple-500/30 backdrop-blur-sm">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Ready to Ace Your Exams?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of students already crushing their study goals
              </p>
              <button className="group relative px-10 py-4 font-bold text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300 shadow-2xl shadow-purple-600/50 hover:shadow-purple-600/80 hover:scale-105 active:scale-95">
                <span className="relative flex items-center gap-2 justify-center">
                  🎯 Start Free Trial
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HowItWorks Component
      <div className="relative z-10">
        <HowItWorks />
      </div> */}
    </div>
  );
}

export default Landing;
