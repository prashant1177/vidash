import React, { useState, useEffect } from 'react';
import { Code2, BarChart3, Users2, Clock, Calendar, CheckSquare, Plus, Edit2, Trash2, Pin, Download, PenTool, Eraser, StickyNote, RefreshCw } from 'lucide-react';


const roles = [
  {
    name: "Development",
    icon: <Code2 className="w-8 h-8 text-orange-500" />,
  },
  {
    name: "Marketing",
    icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
  },
  {
    name: "Management",
    icon: <Users2 className="w-8 h-8 text-orange-500" />,
  },
];

const WorkHorseDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isWorking, setIsWorking] = useState(false);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [totalWorkSeconds] = useState(8 * 60 * 60); // 8 hours
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [scratchMode, setScratchMode] = useState('text');
  const [scratchText, setScratchText] = useState('');
  const [lateMessage, setLateMessage] = useState('');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [workStreak, setWorkStreak] = useState(12);
    const [selected, setSelected] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isWorking && !isOnBreak) {
      interval = setInterval(() => {
        setWorkSeconds(prev => prev + 1);
      }, 1000);
    } else if (isOnBreak) {
      interval = setInterval(() => {
        setBreakSeconds(prev => {
          if (prev <= 0) {
            setIsOnBreak(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorking, isOnBreak]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const remainingSeconds = Math.max(0, totalWorkSeconds - workSeconds);
  const progressPercent = (workSeconds / totalWorkSeconds) * 100;

  const handleStartWork = () => {
    setIsWorking(true);
  };

  const handleBreak = () => {
    setIsOnBreak(true);
    setBreakSeconds(10 * 60); // 10 minute break
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedPercent = todos.length > 0 
    ? (todos.filter(t => t.completed).length / todos.length) * 100 
    : 0;

  const quotes = [
    "Discipline is choosing between what you want now and what you want most.",
    "The only way to do great work is to love what you do.",
    "Success is the sum of small efforts repeated day in and day out."
  ];
  const dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6">
      {/* Main Dashboard */}
      <div className="bg-neutral-950 rounded-xl p-8 mb-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light uppercase tracking-wider"></h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-medium">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="text-lg">{currentTime.toLocaleDateString()}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-[#1E1F3A] font-light">
              U
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
         
 {/* Streak Section */}
          <div className=" border border-neutral-900 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg  font-light mb-4 flex items-center gap-2">
             Select Role
            </h2>
            {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => setSelected(role.name)}
            className={`mt-4 cursor-pointer border border-neutral-800 rounded-2xl p-4  bg-neutral-950 hover:bg-orange-500/10 transition-all duration-300 shadow-lg ${
              selected === role.name ? "border-orange-500 scale-105" : ""
            }`}
          >
            <div className="flex items-center text-center gap-4">
              {role.icon}
              <h2 className="text-md font-extralight">{role.name}</h2>
            </div>
          </div>
        ))}
          </div>
         
          {/* Timer Section */}
        <div className="border border-neutral-900  rounded-xl p-6 shadow-lg flex flex-col items-center mb-8 justify-center h-full">
          <div className="relative mb-6">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#000"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#00C6AE"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progressPercent / 100)}`}
                className="transition-all duration-300"
                style={{ filter: 'drop-shadow(0 0 8px #00C6AE)' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-light text-orange-500 mb-1">
                  {formatTime(remainingSeconds)}
                </div>
                <div className="text-sm text-white font-light opacity-70">remaining</div>
              </div>
            </div>
          </div>
          {/* Control Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleStartWork}
              disabled={isWorking}
              className={`px-8 py-3 rounded-lg font-light text-lg transition-all ${
                isWorking
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#F2F4F8] text-[#1E1F3A] hover:bg-orange-500 hover:text-white'
              }`}
            >
              {isWorking ? 'WORKING...' : 'START'}
            </button>
            <button
              onClick={handleBreak}
              disabled={!isWorking || isOnBreak}
              className={`px-6 py-3 rounded-lg font-light border-2 transition-all ${
                isOnBreak || !isWorking
                  ? 'border-gray-600 text-gray-600 cursor-not-allowed'
                  : 'border-orange-500 text-[#F2F4F8] hover:bg-orange-500 hover:text-white'
              }`}
            >
              {isOnBreak ? `BREAK: ${formatTime(breakSeconds)}` : 'BREAK'}
            </button>
           {/* <button
              onClick={() => setShowLeaveModal(true)}
              className="px-6 py-3 rounded-lg font-light border border-[#F2F4F8] text-[#F2F4F8] hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              APPLY LEAVE
            </button>*/}
          </div>
        </div> {/* Streak Section */}
          <div className=" border border-neutral-900  rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-light mb-4 flex items-center gap-2">
              <span>🔥</span> WORK STREAK
            </h2>
            <div className="text-center">
              <div className="text-5xl font-light text-orange-500 mb-2">{workStreak}</div>
              <div className="text-sm text-gray-400 font-extralight">consecutive days</div>
              <div className="mt-4 pt-4 border-t border-[#3A3C5A]">
                <div className="text-sm text-gray-400 mb-2 font-extralight">This Month</div>
                <div className="text-2xl font-light text-[#F2F4F8]">23 days</div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#3A3C5A]">
                <div className="text-sm text-gray-400 mb-2 font-extralight">Longest Streak</div>
                <div className="text-2xl font-light text-orange-500">45 days</div>
              </div>
            </div>
          </div>
      </div>

</div> 
      {/* Middle Section */}
      <div className="grid grid-cols-5 gap-6 mb-6">
        {/* Scratch Book */}
        <div className="col-span-3 bg-neutral-950 rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-light">
              SCRATCH BOOK
              <div className="h-0.5 w-24 bg-orange-500 mt-1"></div>
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setScratchMode('text')}
                className={`p-2 rounded ${scratchMode === 'text' ? 'bg-orange-500 text-white' : 'text-[#F2F4F8] hover:text-orange-500'}`}
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setScratchMode('sketch')}
                className={`p-2 rounded ${scratchMode === 'sketch' ? 'bg-orange-500 text-white' : 'text-[#F2F4F8] hover:text-orange-500'}`}
              >
                <PenTool className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#F2F4F8] hover:text-orange-500">
                <Eraser className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#F2F4F8] hover:text-orange-500">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <textarea
            value={scratchText}
            onChange={(e) => setScratchText(e.target.value)}
            placeholder="Start typing your ideas..."
            className="font-extralight w-full h-96 bg-black text-[#F2F4F8] p-4 rounded-lg border-2 border-transparent focus:border-orange-500 focus:outline-none resize-none"
            style={{ boxShadow: scratchText ? '0 0 10px rgba(0, 198, 174, 0.2)' : 'none' }}
          />
        </div>

        {/* To-Do List */}
        <div className="col-span-2 border-2 border-neutral-950 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-light">TO-DO LIST</h2>
          </div>

          {/* Add Task */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add new task..."
              className="font-extralight flex-1 bg-neutral-950 text-[#F2F4F8] px-4 py-2 rounded-lg border border-[#3A3C5A] focus:border-orange-500 focus:outline-none"
            />
            <button
              onClick={addTodo}
              className="bg-orange-500 text-white p-2 rounded-lg hover:bg-[#00D4BC] transition-all"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`bg-neutral-950 text-white p-3 rounded-lg flex items-center justify-between group ${
                  todo.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 accent-orange-500 cursor-pointer font-extralight"
                  />
                  <span className={todo.completed ? 'line-through' : ''}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${completedPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2 text-neutral-500 font-extralight">
              <span>Task Completion</span>
              <span>{Math.round(completedPercent)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-neutral-950 border-t-2 border-orange-500 rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="text-sm italic text-gray-400">"{dailyQuote}"</span>
        </div>
        <button className="text-orange-500 hover:text-[#F2F4F8]  transition-colors">
          Tomorrow's Plan →
        </button>
      </div>

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