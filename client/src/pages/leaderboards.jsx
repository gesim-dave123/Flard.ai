import React, { useState } from "react";
import Sidebar from "../components/sidebar";

import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Sparkles,
  User,
  Menu,
  X,
  Plus,
  Zap,
  Star,
  TrendingUp,
  Medal,
  Crown,
  Flame,
  Filter,
  Award,
  Users,
} from "lucide-react";

export default function LeaderboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("leaderboards");
  const [leaderboardType, setLeaderboardType] = useState("global");
  const [timeFrame, setTimeFrame] = useState("all-time");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "classes", label: "My Classes", icon: BookOpen },
    { id: "cards", label: "My Cards", icon: Sparkles },
    { id: "leaderboards", label: "Leaderboards", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
  ];

  // Current user data
  const currentUser = {
    rank: 24,
    name: "Alex Chen",
    level: 12,
    xp: 2450,
    streak: 15,
    cardsStudied: 450,
  };

  // Global Leaderboard Data
  const globalLeaderboard = [
    {
      rank: 1,
      name: "Sarah Johnson",
      level: 28,
      xp: 15420,
      streak: 45,
      cardsStudied: 3200,
      avatar: "👩‍🎓",
      badge: "legendary",
      movement: "up",
      change: 2,
    },
    {
      rank: 2,
      name: "Marcus Lee",
      level: 26,
      xp: 14890,
      streak: 38,
      cardsStudied: 3050,
      avatar: "👨‍💼",
      badge: "epic",
      movement: "down",
      change: 1,
    },
    {
      rank: 3,
      name: "Emma Williams",
      level: 25,
      xp: 13560,
      streak: 42,
      cardsStudied: 2900,
      avatar: "👩‍🔬",
      badge: "epic",
      movement: "up",
      change: 3,
    },
    {
      rank: 4,
      name: "David Kumar",
      level: 23,
      xp: 12340,
      streak: 35,
      cardsStudied: 2650,
      avatar: "👨‍🎓",
      badge: "rare",
      movement: "down",
      change: 2,
    },
    {
      rank: 5,
      name: "Olivia Chen",
      level: 22,
      xp: 11890,
      streak: 30,
      cardsStudied: 2500,
      avatar: "👩‍💻",
      badge: "rare",
      movement: "stable",
      change: 0,
    },
    {
      rank: 6,
      name: "James Rodriguez",
      level: 21,
      xp: 10450,
      streak: 28,
      cardsStudied: 2300,
      avatar: "👨‍🏫",
      badge: "rare",
      movement: "up",
      change: 5,
    },
    {
      rank: 7,
      name: "Sophia Martinez",
      level: 20,
      xp: 9870,
      streak: 25,
      cardsStudied: 2150,
      avatar: "👩‍⚕️",
      badge: "uncommon",
      movement: "down",
      change: 1,
    },
    {
      rank: 8,
      name: "Noah Patel",
      level: 19,
      xp: 8760,
      streak: 22,
      cardsStudied: 1920,
      avatar: "👨‍🔬",
      badge: "uncommon",
      movement: "up",
      change: 8,
    },
    {
      rank: 9,
      name: "Isabella Torres",
      level: 18,
      xp: 8120,
      streak: 20,
      cardsStudied: 1800,
      avatar: "👩‍🎨",
      badge: "uncommon",
      movement: "up",
      change: 2,
    },
    {
      rank: 10,
      name: "Ethan Kim",
      level: 17,
      xp: 7680,
      streak: 18,
      cardsStudied: 1650,
      avatar: "👨‍💻",
      badge: "uncommon",
      movement: "down",
      change: 3,
    },
    {
      rank: 24,
      name: "Alex Chen",
      level: 12,
      xp: 2450,
      streak: 15,
      cardsStudied: 450,
      avatar: "🧑‍💻",
      badge: "common",
      movement: "up",
      change: 4,
      isCurrentUser: true,
    },
  ];

  // Weekly Leaderboard (subset)
  const weeklyLeaderboard = globalLeaderboard.slice(0, 10).map((user, idx) => ({
    ...user,
    rank: idx + 1,
    xp: user.xp - Math.random() * 3000,
    change: Math.floor(Math.random() * 10) - 5,
  }));

  // Friend Leaderboard
  const friendLeaderboard = [
    {
      rank: 1,
      name: "Sarah Johnson",
      level: 28,
      xp: 15420,
      streak: 45,
      cardsStudied: 3200,
      avatar: "👩‍🎓",
      badge: "legendary",
    },
    {
      rank: 2,
      name: "Marcus Lee",
      level: 26,
      xp: 14890,
      streak: 38,
      cardsStudied: 3050,
      avatar: "👨‍💼",
      badge: "epic",
    },
    {
      rank: 3,
      name: "Alex Chen",
      level: 12,
      xp: 2450,
      streak: 15,
      cardsStudied: 450,
      avatar: "🧑‍💻",
      badge: "common",
      isCurrentUser: true,
    },
  ];
    const userData = {
      name: "Alex Chen",
      level: 12,
      currentXP: 2450,
      nextLevelXP: 5000,
      totalCards: 187,
      streak: 15,
      rank: 24,
    };

  const getMedalColor = (rank) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-gray-500";
  };

  const getBadgeColor = (badge) => {
    const colors = {
      legendary: "from-purple-600 to-pink-600",
      epic: "from-blue-600 to-purple-600",
      rare: "from-green-600 to-cyan-600",
      uncommon: "from-yellow-600 to-orange-600",
      common: "from-gray-600 to-gray-700",
    };
    return colors[badge] || colors.common;
  };

  const getLeaderboard = () => {
    if (leaderboardType === "global") {
      return timeFrame === "weekly" ? weeklyLeaderboard : globalLeaderboard;
    } else if (leaderboardType === "friends") {
      return friendLeaderboard;
    }
    return globalLeaderboard;
  };

  const getRankPosition = () => {
    const board = getLeaderboard();
    return board.find((u) => u.isCurrentUser)?.rank || currentUser.rank;
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
      />

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .leaderboard-row {
          transition: all 0.3s ease;
        }
        .leaderboard-row:hover {
          background-color: rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
        }
        .leaderboard-row.current-user {
          background: linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
          border: 1px solid rgba(168, 85, 247, 0.5);
        }
      `}</style>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-30 bg-black/20 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Leaderboards</h1>
              <p className="text-sm text-gray-400 mt-1">
                Compete and climb the ranks
              </p>
            </div>
          </div>
          <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Your Rank Card */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Your Position
                    </h2>
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">Current Rank</p>
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          #{getRankPosition()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Global Ranking</p>
                    </div>
                    <div className="text-center border-l border-white/10 pl-6">
                      <p className="text-gray-400 text-sm mb-2">Level</p>
                      <p className="text-4xl font-bold text-cyan-400 mb-2">
                        {currentUser.level}
                      </p>
                      <p className="text-xs text-gray-500">Current Level</p>
                    </div>
                    <div className="text-center border-l border-white/10 pl-6">
                      <p className="text-gray-400 text-sm mb-2">Total XP</p>
                      <p className="text-4xl font-bold text-yellow-400 mb-2">
                        {currentUser.xp.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Experience Points</p>
                    </div>
                    <div className="text-center border-l border-white/10 pl-6">
                      <p className="text-gray-400 text-sm mb-2">Streak</p>
                      <p className="text-4xl font-bold text-red-400 mb-2">
                        {currentUser.streak}
                      </p>
                      <p className="text-xs text-gray-500">Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                Achievement
              </h3>
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">🎯</div>
                <h4 className="text-white font-semibold">Rising Star</h4>
                <p className="text-sm text-gray-400">
                  Climbed 4 ranks this week
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500 mb-2">Next Achievement</p>
                  <p className="text-white font-semibold">Top 20 Players</p>
                  <p className="text-xs text-gray-400">Rank 4 more spots</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setLeaderboardType("global")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  leaderboardType === "global"
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Global
              </button>
              <button
                onClick={() => setLeaderboardType("friends")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  leaderboardType === "friends"
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                👥 Friends
              </button>
            </div>

            {leaderboardType === "global" && (
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeFrame("all-time")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeFrame === "all-time"
                      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  All Time
                </button>
                <button
                  onClick={() => setTimeFrame("weekly")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeFrame === "weekly"
                      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  Weekly
                </button>
              </div>
            )}
          </div>

          {/* Leaderboard Table */}
          <div className="animate-slide-in">
            {/* Top 3 Podium - Special Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {getLeaderboard()
                .slice(0, 3)
                .map((user, idx) => {
                  const positions = [
                    "order-2 md:scale-105", // Rank 2 (center, larger)
                    "order-1", // Rank 1 (left)
                    "order-3", // Rank 3 (right)
                  ];
                  return (
                    <div
                      key={user.rank}
                      className={`${positions[idx]} transition-transform`}
                    >
                      <div className="relative group">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${getBadgeColor(user.badge)} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-all duration-300`}
                        ></div>
                        <div
                          className={`relative bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-6 text-center transition-all ${
                            user.isCurrentUser
                              ? "border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                              : ""
                          }`}
                        >
                          {/* Medal */}
                          <div className="text-5xl mb-3">
                            {user.rank === 1 && "🥇"}
                            {user.rank === 2 && "🥈"}
                            {user.rank === 3 && "🥉"}
                          </div>

                          {/* User Avatar */}
                          <div className="text-5xl mb-3">{user.avatar}</div>

                          {/* Name */}
                          <h3 className="text-lg font-bold text-white mb-1">
                            {user.name}
                          </h3>
                          {user.isCurrentUser && (
                            <p className="text-xs text-purple-400 font-semibold mb-3">
                              YOU
                            </p>
                          )}

                          {/* Level Badge */}
                          <div
                            className={`inline-block bg-gradient-to-r ${getBadgeColor(user.badge)} text-white text-xs font-bold px-3 py-1 rounded-full mb-4 capitalize`}
                          >
                            Level {user.level} • {user.badge}
                          </div>

                          {/* Stats */}
                          <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-400">XP</span>
                              <span className="text-yellow-400 font-semibold">
                                {user.xp.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-400">Streak</span>
                              <span className="text-red-400 font-semibold">
                                {user.streak} days
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Leaderboard List */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10 font-semibold text-gray-400 text-sm">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5">Player</div>
                <div className="col-span-2 text-right">Level</div>
                <div className="col-span-2 text-right">XP</div>
                <div className="col-span-2 text-right">Streak</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/5">
                {getLeaderboard()
                  .slice(3)
                  .map((user, idx) => (
                    <div
                      key={user.rank}
                      className={`leaderboard-row px-6 py-4 ${user.isCurrentUser ? "current-user" : ""}`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Rank */}
                        <div className="col-span-1">
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-2xl font-black ${getMedalColor(user.rank)}`}
                            >
                              #{user.rank}
                            </span>
                            {user.movement === "up" && (
                              <div className="flex items-center gap-1 text-green-400 text-xs font-semibold">
                                <TrendingUp className="w-3 h-3" />
                                {user.change}
                              </div>
                            )}
                            {user.movement === "down" && (
                              <div className="flex items-center gap-1 text-red-400 text-xs font-semibold">
                                <TrendingUp className="w-3 h-3 rotate-180" />
                                {user.change}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Player Info */}
                        <div className="col-span-5 md:col-span-5 flex items-center gap-3">
                          <div className="text-3xl">{user.avatar}</div>
                          <div>
                            <p className="font-semibold text-white">
                              {user.name}
                            </p>
                            {user.isCurrentUser && (
                              <p className="text-xs text-purple-400 font-semibold">
                                You
                              </p>
                            )}
                            <div
                              className={`inline-block text-xs font-bold px-2 py-1 rounded-full capitalize bg-gradient-to-r ${getBadgeColor(user.badge)} text-white mt-1`}
                            >
                              {user.badge}
                            </div>
                          </div>
                        </div>

                        {/* Level */}
                        <div className="col-span-1 md:col-span-2 text-right">
                          <div className="md:hidden text-gray-400 text-xs mb-1">
                            Level
                          </div>
                          <p className="font-bold text-cyan-400 text-lg">
                            {user.level}
                          </p>
                        </div>

                        {/* XP */}
                        <div className="col-span-1 md:col-span-2 text-right">
                          <div className="md:hidden text-gray-400 text-xs mb-1">
                            XP
                          </div>
                          <p className="font-bold text-yellow-400">
                            {Math.round(user.xp / 1000)}k
                          </p>
                        </div>

                        {/* Streak */}
                        <div className="col-span-1 md:col-span-2 text-right">
                          <div className="md:hidden text-gray-400 text-xs mb-1">
                            Streak
                          </div>
                          <p className="font-bold text-red-400 flex items-center justify-end gap-1">
                            <Flame className="w-4 h-4" />
                            {user.streak}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Current User Highlight (if not in top 10) */}
            {getRankPosition() > 10 && (
              <div className="mt-8">
                <div className="text-center mb-4 text-gray-400 text-sm">
                  ↓ Your Position ↓
                </div>
                <div className="leaderboard-row current-user px-6 py-4 rounded-xl border border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        #{getRankPosition()}
                      </span>
                    </div>
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="text-3xl">{currentUser.avatar}</div>
                      <div>
                        <p className="font-semibold text-white">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-purple-400 font-semibold">
                          You
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-right">
                      <p className="font-bold text-cyan-400 text-lg">
                        {currentUser.level}
                      </p>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-right">
                      <p className="font-bold text-yellow-400">
                        {currentUser.xp.toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-right">
                      <p className="font-bold text-red-400 flex items-center justify-end gap-1">
                        <Flame className="w-4 h-4" />
                        {currentUser.streak}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">Daily Challenges</h3>
              <p className="text-sm text-gray-400">
                Complete daily challenges to earn bonus XP and climb faster
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="text-white font-bold mb-2">
                Maintain Your Streak
              </h3>
              <p className="text-sm text-gray-400">
                Study daily to keep your streak alive and rank higher
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-white font-bold mb-2">Invite Friends</h3>
              <p className="text-sm text-gray-400">
                Compete with friends to make studying more fun
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
