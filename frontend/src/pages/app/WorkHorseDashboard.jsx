import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const tabVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

const WorkHorseDashboard = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const date = useStore((s) => s.date);
  const fetchSceduled = useStore((s) => s.fetchSceduled);

  useEffect(() => {
    fetchSceduled();
  }, [date, fetchSceduled]);

  const handleAddEvent = () => {
    setShowAddEvent(!showAddEvent);
  };

  return (
    <div className="min-h-screen h-full bg-black text-white flex transition-all duration-300 overflow-hidden">
      <AnimatePresence>
        {showAddEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-xl flex justify-center items-center flex-col"
            >
              <TaskInput />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddEvent}
                className="bg-neutral-900 p-3 hover:bg-neutral-800 rounded-full font-light text-neutral-400 hover:text-white transition-colors cursor-pointer mt-4 border border-neutral-800"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      
      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeTab == "calender" ? (
          <motion.div
            key="calender"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 h-full overflow-hidden"
          >
            <Calender handleAddEvent={handleAddEvent} />
          </motion.div>
        ) : activeTab == "todo" ? (
          <motion.div
            key="todo"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 h-full overflow-hidden"
          >
            <ToDo />
          </motion.div>
        ) : activeTab == "bookmarks" ? (
          <motion.div
            key="bookmarks"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 h-full overflow-hidden"
          >
            <BookMark />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-auto"
          >
            <div className="p-8">
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold mb-2 tracking-tight">Good evening</h2>
                <p className="text-zinc-400">Here's your productivity overview</p>
              </motion.div>
              
              {/* Dashboard Grid */}
              <motion.div 
                className="grid grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="h-full">
                  <Upcoming handleAddEvent={handleAddEvent} />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <BookmarkSection />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <ToDoList />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <TimerSection />
                </motion.div>
                
                <motion.div variants={itemVariants} className="col-span-2">
                  <NoteBook />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkHorseDashboard;
