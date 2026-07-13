import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Turnarounds from "./pages/Turnarounds";
import TurnaroundDetail from "./pages/TurnaroundDetail";
import TaskBoard from "./pages/TaskBoard";
import Incidents from "./pages/Incidents";
import Handovers from "./pages/Handovers";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import CommandCenter from "./pages/CommandCenter";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/turnarounds" element={<Turnarounds />} />
        <Route path="/turnarounds/:id" element={<TurnaroundDetail />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/handovers" element={<Handovers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/command-center" element={<CommandCenter />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}