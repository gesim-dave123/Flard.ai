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
  Upload,
  Camera,
  Save,
  Edit2,
  LogOut,
  Settings,
  Mail,
  AtSign,
  Users,
  Clock,
  TrendingUp,
  Zap,
  Star,
  Award,
  Shield,
  Bell,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");

  const [profileData, setProfileData] = useState({
    fullName: "Alex Chen",
    username: "alexchen",
    email: "alex.chen@email.com",
    bio: "Passionate learner | CS Student | Always grinding 📚",
    profilePicture: "🧑‍💻",
    joinDate: "January 15, 2024",
    location: "San Francisco, CA",
    website: "www.alexchen.dev",
  });

  const [editFormData, setEditFormData] = useState(profileData);
  const [uploadedImage, setUploadedImage] = useState(null);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "classes", label: "My Classes", icon: BookOpen },
    { id: "cards", label: "My Cards", icon: Sparkles },
    { id: "leaderboards", label: "Leaderboards", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
  ];

  const currentUser = {
    rank: 24,
    name: "Alex Chen",
    level: 12,
    xp: 2450,
    streak: 15,
    cardsStudied: 450,
  };
  const userData = {
    name: "Alex Chen",
    level: 12,
    currentXP: 2450,
    nextLevelXP: 5000,
    totalCards: 187,
    streak: 15,
    rank: 24,
  };

  const userStats = {
    level: 12,
    totalXP: 2450,
    cardsCreated: 187,
    cardsStudied: 450,
    streak: 15,
    rank: 24,
    accuracy: 87.3,
    studyTime: "48h 32m",
    joinDays: 185,
  };

  const achievements = [
    {
      id: 1,
      icon: "🔥",
      name: "15 Day Streak",
      description: "Study for 15 consecutive days",
    },
    {
      id: 2,
      icon: "🎯",
      name: "Perfect 100%",
      description: "Get 100% accuracy on all cards",
    },
    {
      id: 3,
      icon: "⚡",
      name: "Speed Demon",
      description: "Complete 50 cards in under 5 minutes",
    },
    {
      id: 4,
      icon: "👑",
      name: "Top 25",
      description: "Reach top 25 in global leaderboard",
    },
    {
      id: 5,
      icon: "📚",
      name: "Knowledge Master",
      description: "Create 100 flashcards",
    },
    {
      id: 6,
      icon: "🌟",
      name: "First Steps",
      description: "Complete your first flashcard set",
    },
  ];

  const handleEditClick = () => {
    setEditFormData(profileData);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setProfileData(editFormData);
    setIsEditing(false);
    // Here you would typically send the data to your backend
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        // In a real app, you'd upload this to your server
      };
      reader.readAsDataURL(file);
    }
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
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
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
              <h1 className="text-2xl font-bold text-white">Profile</h1>
              <p className="text-sm text-gray-400 mt-1">
                Manage your account settings and information
              </p>
            </div>
          </div>
          <User className="w-8 h-8 text-purple-400" />
        </div>

        {/* Content Area */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 animate-slide-in">
              {/* Profile Card */}
              <div className="relative group mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all">
                  {/* Header with Edit Button */}
                  <div className="flex items-start justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">
                      Profile Information
                    </h2>
                    {!isEditing && (
                      <button
                        onClick={handleEditClick}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/50 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {/* Profile Picture Section */}
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <p className="text-sm font-semibold text-gray-300 mb-4">
                      Profile Picture
                    </p>
                    <div className="flex items-end gap-6">
                      {/* Avatar */}
                      <div className="relative">
                        <div
                          className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl border-4 border-white/10 ${
                            uploadedImage ? "bg-cover bg-center" : ""
                          }`}
                          style={
                            uploadedImage
                              ? {
                                  backgroundImage: `url(${uploadedImage})`,
                                  backgroundSize: "cover",
                                }
                              : {}
                          }
                        >
                          {!uploadedImage && profileData.profilePicture}
                        </div>
                        {isEditing && (
                          <label className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                            <Camera className="w-5 h-5 text-white" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      {isEditing && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">
                            Click the camera icon to upload a new picture
                          </p>
                          <p className="text-xs text-gray-500">
                            Recommended: Square image, at least 400x400px
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  {!isEditing ? (
                    // Display Mode
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
                          Full Name
                        </p>
                        <p className="text-lg text-white font-semibold">
                          {profileData.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase flex items-center gap-2">
                          <AtSign className="w-3 h-3" />
                          Username
                        </p>
                        <p className="text-lg text-white font-semibold">
                          {profileData.username}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          Email
                        </p>
                        <p className="text-lg text-white font-semibold">
                          {profileData.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
                          Bio
                        </p>
                        <p className="text-white">{profileData.bio}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
                          Location
                        </p>
                        <p className="text-white">{profileData.location}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">
                          Website
                        </p>
                        <a
                          href={`https://${profileData.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {profileData.website}
                        </a>
                      </div>
                    </div>
                  ) : (
                    // Edit Mode
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={editFormData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                          <AtSign className="w-4 h-4" />
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={editFormData.username}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={editFormData.bio}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editFormData.location}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          value={editFormData.website}
                          onChange={handleInputChange}
                          placeholder="www.example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-6 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveProfile}
                          className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/50 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Statistics Grid */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Your Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Level",
                      value: userStats.level,
                      icon: Star,
                      color: "from-yellow-400 to-orange-500",
                    },
                    {
                      label: "Total XP",
                      value: userStats.totalXP,
                      icon: Zap,
                      color: "from-purple-400 to-pink-500",
                    },
                    {
                      label: "Cards Studied",
                      value: userStats.cardsStudied,
                      icon: BookOpen,
                      color: "from-blue-400 to-cyan-500",
                    },
                    {
                      label: "Rank",
                      value: `#${userStats.rank}`,
                      icon: Trophy,
                      color: "from-green-400 to-emerald-500",
                    },
                    {
                      label: "Streak",
                      value: `${userStats.streak}d`,
                      icon: Sparkles,
                      color: "from-red-400 to-pink-500",
                    },
                    {
                      label: "Accuracy",
                      value: `${userStats.accuracy}%`,
                      icon: TrendingUp,
                      color: "from-cyan-400 to-blue-500",
                    },
                    {
                      label: "Study Time",
                      value: userStats.studyTime,
                      icon: Clock,
                      color: "from-pink-400 to-rose-500",
                    },
                    {
                      label: "Member Since",
                      value: "185d",
                      icon: Award,
                      color: "from-violet-400 to-purple-500",
                    },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="stat-card relative group">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-300`}
                        ></div>
                        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-xl p-4 text-center transition-all">
                          <Icon
                            className={`w-5 h-5 mx-auto mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                          />
                          <p className="text-xs text-gray-400 mb-1">
                            {stat.label}
                          </p>
                          <p className="text-xl font-bold text-white">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Achievements & Settings */}
            <div className="lg:col-span-1">
              {/* Achievements Section */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all mb-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Achievements
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-white/30 transition-all cursor-pointer group"
                      title={achievement.description}
                    >
                      <p className="text-2xl mb-1">{achievement.icon}</p>
                      <p className="text-xs font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {achievement.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  Settings
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 group">
                    <div className="flex items-center gap-3 text-left">
                      <Bell className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Notifications
                        </p>
                        <p className="text-xs text-gray-500">Manage alerts</p>
                      </div>
                    </div>
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 group">
                    <div className="flex items-center gap-3 text-left">
                      <Lock className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Security
                        </p>
                        <p className="text-xs text-gray-500">Change password</p>
                      </div>
                    </div>
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 group">
                    <div className="flex items-center gap-3 text-left">
                      <Shield className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Privacy
                        </p>
                        <p className="text-xs text-gray-500">
                          Profile visibility
                        </p>
                      </div>
                    </div>
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  <button className="w-full flex items-center justify-between px-4 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all border border-red-500/30 group mt-6">
                    <div className="flex items-center gap-3 text-left">
                      <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                      <p className="text-sm font-semibold text-red-400 group-hover:text-red-300">
                        Logout
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all mt-8">
                <h3 className="text-lg font-bold text-white mb-4">
                  Account Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Member Since</p>
                    <p className="text-white font-semibold">
                      {profileData.joinDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Account Status</p>
                    <p className="text-green-400 font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Active
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Email Verification</p>
                    <p className="text-cyan-400 font-semibold">Verified ✓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
