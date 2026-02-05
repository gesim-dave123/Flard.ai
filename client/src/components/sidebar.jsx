import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Trophy,
  User,
  Settings,
  LogOut,
} from "lucide-react";


export default function Sidebar({ isOpen, activeTab, setActiveTab, userData }) {
    const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "classes", label: "My Classes", icon: BookOpen },
    { id: "cards", label: "My Cards", icon: Sparkles },
    { id: "leaderboards", label: "Leaderboards", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
    ];
    return (
    <div
      className={`fixed left-0 top-0 h-screen bg-black/60 backdrop-blur-2xl border-r border-white/10 transition-all duration-500 ease-in-out ${isOpen ? "w-64" : "w-20"} z-40 flex flex-col`}
    >
      {/* Logo Section */}
      <div className="p-6 mb-4">
        <div
          className={`flex items-center gap-3 ${!isOpen && "justify-center"}`}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-black p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          {isOpen && (
            <span className="font-black text-xl tracking-tight text-white italic">
              FLARD
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl border border-white/10" />
              )}
              <Icon
                className={`w-5 h-5 z-10 ${isActive ? "text-purple-400" : "group-hover:scale-110 transition-transform"}`}
              />
              {isOpen && (
                <span className="text-sm font-semibold z-10">{item.label}</span>
              )}
              {isActive && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Stats Card (Only when open) */}
      {isOpen && (
        <div className="px-4 mb-4">
          <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">
                Level {userData.level}
              </span>
              <span className="text-xs text-gray-400">
                {userData.currentXP} XP
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-1000"
                style={{
                  width: `${(userData.currentXP / userData.nextLevelXP) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Profile */}
      <div className="p-4 border-t border-white/5">
        <div
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer ${!isOpen && "justify-center"}`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg">
            {userData.name.charAt(0)}
          </div>
          {isOpen && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {userData.name}
              </p>
              <p className="text-xs text-gray-500 truncate">Pro Scholar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

