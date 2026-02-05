// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/createAccount";
import FlardDashboard from "./pages/dashboard";
import MyClassesPage from "./pages/myClass";
import LeaderboardPage from "./pages/leaderboards";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<FlardDashboard />} />
      <Route path="/myClasses" element={<MyClassesPage />} />
      <Route path="/leaderboards" element={<LeaderboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
