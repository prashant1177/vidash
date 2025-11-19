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
  X,
} from "lucide-react";
import TimerSection from "./components/TimerSection";
import StreakSection from "./components/StreakSection";
import NoteBook from "./components/NoteBook";
import ToDoList from "./components/ToDoList";
import DailyQuote from "./components/DailyQuote";
import Calender from "./components/Calender";
import Upcoming from "./components/Upcoming";
import axiosClient from "../../api/api";
import TaskInput from "./components/TaskInput";
import BookmarkSection from "./components/BookmarkSection";
import QuoteSection from "./components/DailyQuote";
import Sidebar from "../../Components/Sidebar";
import ToDo from "./components/ToDo";
import BookMark from "./components/BookMark";
import useStore from "../../Store";
const WorkHorseDashboard = () => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const date = useStore((s) => s.date);
  const fetchSceduled = useStore((s) => s.fetchSceduled);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const tem = localStorage.getItem("user");
      setUser(JSON.parse(tem));
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    fetchSceduled();
  }, [date, fetchSceduled]);

  const handleAddEvent = () => {
    setShowAddEvent(!showAddEvent);
  };
  return (
    <div className="min-h-screen h-full bg-black text-white flex transition-all duration-300">
      {showAddEvent ? (
        <div className="fixed  top-0 flex items-center justify-center w-full h-screen backdrop-blur-xs z-10">
          <div className="w-full max-w-xl flex justify-center items-center flex-col">
            <TaskInput />
            <button
              onClick={handleAddEvent}
              className="bg-neutral-900  p-3 hover:p-4  rounded-full font-light text-neutral-700 hover:text-neutral-500 transition-all duration-300 cursor-pointer mt-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      {/* Main Dashboard      <div className="flex justify-between items-center px-6 sticky top-0 backdrop-blur-lg w-full py-3 shadow-2xl">
        <h1 className="text-sm font-light uppercase tracking-wider">Vidash</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2  font-extralight">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
          </div>
          <button
            onClick={handleOpenSchedule}
            className="flex items-center gap-2 cursor-pointer  font-extralight"
          >
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{currentTime.toLocaleDateString()}</span>
          </button>
          <div className="w-6 h-6 text-sm rounded-full bg-orange-500 flex items-center justify-center text-white font-light">
            {user ? user.name?.[0]?.toUpperCase() : "NA"}
          </div>
        </div>
      </div>*/}{" "}
      {/* Scedule */}
      {activeTab == "calender" ? (
        <Calender handleAddEvent={handleAddEvent} />
      ) : activeTab == "todo" ? (
        <ToDo />
      ) : activeTab == "bookmarks" ? (
        <BookMark />
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Good evening</h2>
              <p className="text-zinc-400">Here's your productivity overview</p>
            </div>
            {/* TOP ROW: 3 equal sections */}
            <div className="grid grid-cols-3 gap-6 ">
              <Upcoming handleAddEvent={handleAddEvent} />
              <BookmarkSection />
              {/* RIGHT SIDE (3 equal rows) */}
              <ToDoList />
              <TimerSection />
              <NoteBook />
            </div>
          </div>
        </div>
      )}
      {/* Footer
      <DailyQuote /> */}
      {/* Leave Modal */}
    </div>
  );
};

export default WorkHorseDashboard;
