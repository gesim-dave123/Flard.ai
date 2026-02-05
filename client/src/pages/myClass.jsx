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
  Upload,
  Zap,
  Star,
  TrendingUp,
  Clock,
  ArrowRight,
  Trash2,
  Edit2,
  GraduationCap,
  BookMarked,
} from "lucide-react";

export default function MyClassesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("classes");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Biology 101",
      description:
        "Comprehensive study guide for AP Biology covering cells, genetics, and evolution.",
      cardCount: 245,
      xpEarned: 1240,
      progress: 65,
      color: "from-green-400 to-emerald-600",
      emoji: "🧬",
      lastStudied: "2 hours ago",
    },
    {
      id: 2,
      name: "Spanish Vocabulary",
      description:
        "Essential Spanish words and phrases for daily conversation and travel.",
      cardCount: 156,
      xpEarned: 780,
      progress: 42,
      color: "from-yellow-400 to-orange-600",
      emoji: "🌮",
      lastStudied: "Yesterday",
    },
    {
      id: 3,
      name: "Calculus II",
      description:
        "Integration techniques, series, and differential equations practice problems.",
      cardCount: 189,
      xpEarned: 945,
      progress: 58,
      color: "from-blue-400 to-blue-700",
      emoji: "∫",
      lastStudied: "3 days ago",
    },
    {
      id: 4,
      name: "World History",
      description:
        "Historical events, dates, and key figures from ancient to modern times.",
      cardCount: 312,
      xpEarned: 1560,
      progress: 78,
      color: "from-purple-400 to-pink-600",
      emoji: "📚",
      lastStudied: "Today",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
   const userData = {
     name: "Alex Chen",
     level: 12,
     currentXP: 2450,
     nextLevelXP: 5000,
     totalCards: 187,
     streak: 15,
     rank: 24,
   };


  const handleCreateClass = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim()) {
      const newClass = {
        id: classes.length + 1,
        name: formData.name,
        description: formData.description,
        cardCount: 0,
        xpEarned: 0,
        progress: 0,
        color: [
          "from-red-400 to-pink-600",
          "from-green-400 to-emerald-600",
          "from-blue-400 to-blue-700",
          "from-yellow-400 to-orange-600",
          "from-purple-400 to-indigo-600",
          "from-cyan-400 to-blue-600",
        ][Math.floor(Math.random() * 6)],
        emoji: ["🧬", "🌮", "∫", "📚", "🎨", "💻", "🧪", "🎭"][
          Math.floor(Math.random() * 8)
        ],
        lastStudied: "Never",
      };
      setClasses([newClass, ...classes]);
      setFormData({ name: "", description: "" });
      setShowCreateModal(false);
    }
  };

  const deleteClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
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
        .class-card {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .class-card:hover {
          transform: translateY(-8px);
        }
      `}</style>

      {/* Sidebar */}

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
              <h1 className="text-2xl font-bold text-white">My Classes</h1>
              <p className="text-sm text-gray-400 mt-1">
                {classes.length} subjects to master
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/50 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            New Class
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Classes</p>
                  <p className="text-3xl font-bold text-white">
                    {classes.length}
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-400 opacity-50" />
              </div>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Cards</p>
                  <p className="text-3xl font-bold text-white">
                    {classes.reduce((sum, c) => sum + c.cardCount, 0)}
                  </p>
                </div>
                <Sparkles className="w-8 h-8 text-pink-400 opacity-50" />
              </div>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">XP Earned</p>
                  <p className="text-3xl font-bold text-white">
                    {classes.reduce((sum, c) => sum + c.xpEarned, 0)}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-yellow-400 opacity-50" />
              </div>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              Your Subjects
            </h2>

            {classes.length === 0 ? (
              <div className="bg-black/40 backdrop-blur-xl border-2 border-dashed border-white/10 rounded-xl p-16 text-center">
                <BookMarked className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No classes yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Create your first class to start generating flashcards
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/50 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Class
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {classes.map((classItem, idx) => (
                  <div
                    key={classItem.id}
                    className="animate-slide-in class-card group relative overflow-hidden rounded-2xl"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${classItem.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${classItem.color} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-all duration-300 -z-10`}
                    ></div>

                    {/* Card Content */}
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/30 transition-all p-6 rounded-2xl">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{classItem.emoji}</div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-400 transition-all">
                              {classItem.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              Last studied {classItem.lastStudied}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                            <Edit2 className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            onClick={() => deleteClass(classItem.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-300 mb-6 line-clamp-2">
                        {classItem.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-400">
                            Progress
                          </span>
                          <span
                            className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${classItem.color}`}
                          >
                            {classItem.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${classItem.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${classItem.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-white/5">
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Cards</p>
                          <p className="text-lg font-bold text-white">
                            {classItem.cardCount}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">
                            XP Earned
                          </p>
                          <p className="text-lg font-bold text-yellow-400">
                            {classItem.xpEarned}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Mastery</p>
                          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {Math.round(classItem.xpEarned / 25)}%
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/50 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group-hover:translate-x-1">
                        Study Cards
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="animate-slide-in relative w-full max-w-md bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl p-8">
            {/* Close Button */}
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <h2 className="text-2xl font-bold text-white mb-2">
              Create New Class
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Add a new subject to your learning journey
            </p>

            <form onSubmit={handleCreateClass} className="space-y-4">
              {/* Class Name Input */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Class/Subject Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Chemistry 101, Spanish Vocab"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe what this class covers..."
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/50 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Create Class
                </button>
              </div>
            </form>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
          </div>
        </div>
      )}
    </div>
  );
}
