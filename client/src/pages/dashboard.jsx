import React, { useState, useRef } from "react";
import Sidebar from "../components/sidebar";
import { generateFlashCards } from "../api/flashcards.js";
import {
  Plus,
  Menu,
  X,
  Star,
  Zap,
  Sparkles,
  TrendingUp,
  Clock,
  Upload,
  Trophy,
  BookOpen,
} from "lucide-react";

export default function FlardDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Added to track selected file locally
  const fileInputRef = useRef(null);

  const userData = {
    name: "Alex Chen",
    level: 12,
    currentXP: 2450,
    nextLevelXP: 5000,
    totalCards: 187,
    streak: 15,
    rank: 24,
  };

  const recentCards = [
    {
      id: 1,
      title: "Biology Chapter 3",
      cards: 45,
      xp: 180,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-emerald-500/50",
    },
    {
      id: 2,
      title: "Spanish Vocab",
      cards: 32,
      xp: 128,
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-orange-500/50",
    },
    {
      id: 3,
      title: "Calculus Formulas",
      cards: 58,
      xp: 232,
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/50",
    },
  ];

  // Modified Handle file upload - handles UI and local state
  const handleFileUpload = async (files) => {
    const pdfFiles = Array.from(files).filter(
      (file) => file.type === "application/pdf",
    );

    if (pdfFiles.length === 0) {
      setUploadMessage("Please upload a PDF file.");
      setTimeout(() => setUploadMessage(""), 3000);
      return;
    }

    const file = pdfFiles[0];
    setUploading(true);
    setUploadMessage(`Analyzing ${file.name}...`);

    // SIMULATED LOCAL PROCESSING (Replace with fetch later)
    setTimeout(() => {
      setSelectedFile(file);
      setUploading(false);
      setUploadMessage(`✓ ${file.name} ready for magic!`);
      // Optional: Clear message after 5s
      // setTimeout(() => setUploadMessage(""), 5000);
    }, 1500);
  };

  const handleSubmitFile = async (file) => {
    if (!file) return;

    setUploading(true);
    setUploadMessage(`Generating flashcards from ${file.name}...`);

    try {
      await generateFlashCards(file);
      setUploadMessage(`✓ ${file.name} generating...`);
    } catch (err) {
      setUploadMessage("Error generating flashcards.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const { files } = e.dataTransfer;
    handleFileUpload(files);
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation(); // Prevent card click from double-triggering
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
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

      <main
        className={`transition-all duration-500 ${
          sidebarOpen ? "ml-64" : "ml-20"
        } min-h-screen p-6 md:p-10`}
      >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
              >
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <h1 className="text-3xl font-black tracking-tight text-white">
                Dashboard<span className="text-purple-500">.</span>
              </h1>
            </div>
            <p className="text-gray-500 mt-1 ml-11">
              Welcome back, {userData.name.split(" ")[0]}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-medium">
              View Analytics
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Plus size={18} />
              New Study Set
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Global Rank",
              value: `#${userData.rank}`,
              icon: Trophy,
              color: "text-yellow-400",
            },
            {
              label: "Daily Streak",
              value: `${userData.streak} Days`,
              icon: Zap,
              color: "text-orange-400",
            },
            {
              label: "Flashcards",
              value: userData.totalCards,
              icon: Sparkles,
              color: "text-cyan-400",
            },
            {
              label: "Mastery",
              value: "87%",
              icon: Star,
              color: "text-purple-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.06] transition-all group"
            >
              <stat.icon
                className={`${stat.color} mb-4 group-hover:scale-110 transition-transform`}
                size={24}
              />
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              Continue Studying
            </h2>
            <div className="space-y-4">
              {recentCards.map((set) => (
                <div
                  key={set.id}
                  className={`group bg-gradient-to-r ${set.color} border ${set.borderColor} rounded-3xl p-6 flex items-center justify-between hover:scale-[1.01] transition-all cursor-pointer`}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center border border-white/10">
                      <BookOpen className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {set.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {set.cards} Flashcards • {set.xp} Potential XP
                      </p>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black group-hover:translate-x-1 transition-transform">
                    <TrendingUp size={20} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
              className={`bg-white/[0.03] border-2 rounded-3xl p-8 flex flex-col items-center text-center gap-4 transition-all cursor-pointer ${
                isDragging
                  ? "border-purple-500 bg-purple-500/10 scale-105"
                  : "border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
              } ${uploading ? "opacity-75 pointer-events-none" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
                disabled={uploading}
              />

              <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2">
                <Upload
                  className={`text-purple-400 transition-transform ${
                    uploading ? "animate-bounce" : ""
                  } ${selectedFile ? "text-green-400" : ""}`}
                  size={32}
                />
              </div>

              <h3 className="font-bold text-lg text-white">AI Magic Creator</h3>

              <p className="text-sm text-gray-500">
                {selectedFile
                  ? "File ready! Click button below to generate."
                  : "Drop your lecture notes here and let Flard generate your study cards instantly."}
              </p>

              {uploadMessage && (
                <div
                  className={`w-full text-xs font-medium py-2 px-3 rounded-lg ${
                    uploadMessage.includes("Please") ||
                    uploadMessage.includes("Error")
                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                      : "bg-green-500/20 text-green-300 border border-green-500/30"
                  }`}
                >
                  {uploadMessage}
                </div>
              )}

              {selectedFile ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmitFile(selectedFile);
                    console.log("Generating cards for:", selectedFile.name);
                  }}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                  Generate Cards
                </button>
              ) : (
                <button
                  onClick={handleBrowseClick}
                  disabled={uploading}
                  className="w-full mt-2 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {uploading ? "Reading..." : "Upload File"}
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
