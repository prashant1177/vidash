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
import TimerSection from "./components/TimerSection";
import StreakSection from "./components/StreakSection";
import NoteBook from "./components/NoteBook";
import ToDoList from "./components/ToDoList";
import DailyQuote from "./components/DailyQuote";
import Calender from "./components/Calender";
import Upcoming from "./components/Upcoming";
import axiosClient from "../../api/api";
import TaskInput from "./components/TaskInput";

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
  const formatDate = (d) => d.toISOString().split("T")[0];
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
      onAdd(data);
      setUserScheduled(data);
    }
  }, [date]);

  const onAdd = (data) => {
    let j = 0;
    console.log(
      "Scheduling data processing: //add to to allow the user to edit and delete data",
      data
    );
    const timeColorText = Array.from({ length: 24 * 4 }, (_, i) => {
      const hour = Math.floor(i / 4);
      const minute = (i % 4) * 15;
      if (data && j < data.length) {
        console.log(
          data[j].startTime.slice(0, 5),
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        );
        if (
          data[j].startTime.slice(0, 5) ==
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        ) {
          return {
            time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`,
            color: data[j].color,
            title: data[j].title,
          };
        } else if (
          data[j].startTime.slice(0, 5) <
            `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}` &&
          data[j].endTime.slice(0, 5) >
            `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`
        ) {
          return {
            time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`,
            color: data[j].color,
            title: "",
          };
        } else if (
          data[j].endTime.slice(0, 5) ==
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        ) {
          return {
            time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`,
            color: data[j++].color,
            title: "",
          };
        } else {
          return {
            time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`,
            color: "neutral",
            title: "",
          };
        }
      } else {
        return {
          time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
          )}`,
          color: "neutral",
          title: "",
        };
      }
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
    <div className="min-h-screen bg-black text-white font-sans px-6">
      {/* Scedule */}
      {showScedule ? (
        <Calender
          onAdd={onAdd}
          changeDate={changeDate}
          sceduled={sceduled}
          setSceduled={setSceduled}
          date={date}
          setShowScedule={setShowScedule}
        />
      ) : null}
      {showAddEvent ? (
        <div className="fixed  top-0 flex items-center justify-center w-full h-screen backdrop-blur-sm bg-black/10">
          <div className="w-full max-w-xl flex justify-center items-center flex-col">
            <TaskInput />
            <button onClick={handleAddEvent} className="bg-orange-500 px-4 py-2 rounded-lg font-light hover:bg-[#00D4BC] transition-all mt-2 w-fit">
              Close
            </button>
          </div>
        </div>
      ) : null}
      <div className="flex justify-between items-center px-6 sticky top-0 backdrop-blur-lg w-full py-4 rounded-xl shadow-2xl">
        <h1 className="text-xl font-light uppercase tracking-wider">Vidash</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-medium">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <button onClick={handleOpenSchedule} className="flex items-center gap-2 cursor-pointer">
            <Calendar className="w-5 h-5 text-orange-500" />
            <span className="text-lg">{currentTime.toLocaleDateString()}</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-light">
            {user ? user.name?.[0]?.toUpperCase() : "NA"}
          </div>
        </div>
      </div>
      {/* Main Dashboard */}
      <div className="bg-neutral-950 rounded-xl p-8 mb-6 shadow-2xl">
        {/* Header */}

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
          <Upcoming
            userScheduled={userScheduled}
            handleOpenSchedule={handleOpenSchedule}
            handleAddEvent={handleAddEvent}
          />
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
