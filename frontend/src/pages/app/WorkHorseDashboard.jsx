import React, { useState, useEffect } from "react";
import {
  Code2,
  BarChart3,
  Users2,
  Clock,
  CheckSquare,
  Plus,
  Edit2,
  Trash2,
  Pin,
  Download,
  PenTool,
  Eraser,
  StickyNote,
  RefreshCw,
  History,
  Calendar,
} from "lucide-react";
import SelectRole from "./components/SelectRole";
import TimerSection from "./components/TimerSection";
import StreakSection from "./components/StreakSection";
import NoteBook from "./components/NoteBook";
import ToDoList from "./components/ToDoList";
import DailyQuote from "./components/DailyQuote";
import Scedule from "./components/Scedule";
import Calender from "./components/Calender";
import Upcoming from "./components/Upcoming";

const WorkHorseDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lateMessage, setLateMessage] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showScedule, setShowScedule] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const tem =localStorage.getItem("user")
      setUser(JSON.parse(tem));
    } else {
      window.location.href = "/login";
    }
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6">
      {/* Scedule */}
      {showScedule ? <Calender setShowScedule={setShowScedule} /> : null}
      {/* Main Dashboard */}
      <div className="bg-neutral-950 rounded-xl p-8 mb-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light uppercase tracking-wider"></h1>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowScedule(!showScedule)}
              className="bg-orange-500 px-4 py-2 rounded-lg font-light hover:bg-[#00D4BC] transition-all"
            >
              {showScedule ? "Close Scedule" : "Open Scedule"}
            </button>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-medium">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="text-lg">
                {currentTime.toLocaleDateString()}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-light">
              {user ? user.name?.[0]?.toUpperCase() : "NA"}
            </div>
          </div>
        </div>

        {/* Late Message */}
        {lateMessage && (
          <div className="bg-orange-500 text-[#1E1F3A] px-4 py-2 rounded-lg text-center font-medium">
            {lateMessage}
          </div>
        )}

        {/* Streak and Personality Section Inside Dashboard */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          {/* Streak Section 
          <SelectRole />*/}
          <Upcoming />
          {/* Timer Section */}
          <TimerSection />
          {/* Streak Section */}
          <StreakSection />
        </div>
      </div>
      {/* Middle Section */}
      <div className="grid grid-cols-5 gap-6 mb-6">
        {/* Scratch Book */}
        <NoteBook />
        {/* To-Do List */}
        <ToDoList />
      </div>

      {/* Footer */}
      <DailyQuote />

      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#282A4D] rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-light mb-4">Apply for Leave</h3>
            <input
              type="text"
              placeholder="Reason for leave..."
              className="w-full bg-[#1E1F3A] text-[#F2F4F8] px-4 py-3 rounded-lg border border-[#3A3C5A] focus:border-orange-500 focus:outline-none mb-4"
            />
            <input
              type="date"
              className="w-full bg-[#1E1F3A] text-[#F2F4F8] px-4 py-3 rounded-lg border border-[#3A3C5A] focus:border-orange-500 focus:outline-none mb-6"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-light hover:bg-[#00D4BC] transition-all"
              >
                Submit
              </button>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 border border-[#F2F4F8] py-3 rounded-lg font-light hover:border-orange-500 hover:text-orange-500 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkHorseDashboard;
