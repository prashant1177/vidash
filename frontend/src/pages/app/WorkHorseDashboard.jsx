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
function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
const WorkHorseDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lateMessage, setLateMessage] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showScedule, setShowScedule] = useState(false);
  const [user, setUser] = useState(null);
  const [userScheduled, setUserScheduled] = useState([]);
  const [sceduled, setSceduled] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [nextTask, setNextTask] = useState({});
  const formatDate = (d) => d.toISOString().split("T")[0];
  const [activeTab, setActiveTab] = useState("");
  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    setDate(newDate);
  };


  useEffect(() => {
    // Fetch scheduled tasks for the selected date from backend here
    // and update the sceduled state accordingly
    fetchSceduled();
    async function fetchSceduled() {
      const res = await axiosClient.get(`/api/schedule/${formatDate(date)}`); // Fetch from backend
      const data = res.data;

      const scheduleData = data.map((item) => ({
        ...item,
        startMin: toMinutes(item.startTime),
        endMin: toMinutes(item.endTime),
      }));
      onAdd(scheduleData);
      const nextTasks = data.filter((data) => {
        const now = new Date();
        const [hour, minute] = data.endTime.split(":").map(Number);
        const taskTime = new Date();
        taskTime.setHours(hour, minute, 0, 0);
        return taskTime > now; // only keep future times
      });

      setUserScheduled(nextTasks);
      if (nextTasks.length > 0) setNextTask(nextTasks[0]);
    }
  }, [date]);

  const onAdd = (events) => {
    let j = 0;

    const timeColorText = Array.from({ length: 96 }, (_, i) => {
      const hour = Math.floor(i / 4);
      const minute = (i % 4) * 15;
      const slotMin = hour * 60 + minute;
      const formatted = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;

      if (j < events.length) {
        const evt = events[j];

        if (slotMin === evt.startMin) {
          return {
            id: evt.id,
            time: formatted,
            color: evt.color,
            title: evt.title,
          };
        }

        if (slotMin > evt.startMin && slotMin < evt.endMin) {
          return { id: evt.id, time: formatted, color: evt.color, title: "" };
        }

        if (slotMin === evt.endMin) {
          const result = {
            id: evt.id,
            time: formatted,
            color: evt.color,
            title: "",
          };
          j++; // move to next event
          return result;
        }
      }

      return { time: formatted, color: "neutral", title: "" };
    });

    setSceduled(timeColorText);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const tem = localStorage.getItem("user");
      setUser(JSON.parse(tem));
    } else {
      window.location.href = "/login";
    }
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenSchedule = () => {
    setShowScedule(!showScedule);
  };

  const handleAddEvent = () => {
    setShowAddEvent(!showAddEvent);
  };
  return (
    <div className="min-h-screen bg-black text-white flex ">
     
      {showAddEvent ? (
        <div className="fixed  top-0 flex items-center justify-center w-full h-screen backdrop-blur-xs bg-black/90 z-10">
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

      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab}/>
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
      </div>*/} {/* Scedule */}
      {activeTab == "calender"? (
        <Calender
          onAdd={onAdd}
          changeDate={changeDate}
          sceduled={sceduled}
          setSceduled={setSceduled}
          date={date}
          setShowScedule={setShowScedule}
        />
      ) : 
      <div className="grid grid-cols-4 h-screen gap-4 p-4 ">

  {/* LEFT SIDE (big 3-column area) */}
  <div className="grid col-span-3 grid-rows-2 gap-4 h-full">

    {/* TOP ROW: 3 equal sections */}
    <div className="grid grid-cols-3 gap-4 h-full ">
      <Upcoming
        userScheduled={userScheduled}
        handleOpenSchedule={handleOpenSchedule}
        handleAddEvent={handleAddEvent}
      />
      <BookmarkSection />
    </div>

    {/* BOTTOM ROW: 3 equal sections */}
    <div className="grid grid-cols-3 gap-4 h-full">
      <TimerSection nextTask={nextTask} currentTime={currentTime} />
      <NoteBook />
      <div className="bg-transparent"></div>
    </div>

  </div>

  {/* RIGHT SIDE (3 equal rows) */}
    <ToDoList />

</div>}

      {/* Footer
      <DailyQuote /> */}

      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
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
