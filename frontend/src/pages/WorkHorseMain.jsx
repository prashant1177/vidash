import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckSquare, Plus, Edit2, Trash2, Pin, Download, PenTool, Eraser, StickyNote, RefreshCw } from 'lucide-react';

const WorkHorseMain = () => {
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
    <div className="h-screen bg-[#1E1F3A] text-[#F2F4F8] font-sans p-4 overflow-hidden flex flex-col">
      {/* Main Dashboard */}
      <div className="bg-[#252747] rounded-xl p-6 mb-4 shadow-2xl flex-shrink-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">WORKHORSE</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00C6AE]" />
              <span className="text-sm font-medium">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00C6AE]" />
              <span className="text-sm">{currentTime.toLocaleDateString()}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#00C6AE] flex items-center justify-center text-[#1E1F3A] font-bold text-sm">
              U
            </div>
          </div>
        </div>

        {/* Timer Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="#2A2C4A"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="#00C6AE"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 58}`}
                strokeDashoffset={`${2 * Math.PI * 58 * (1 - progressPercent / 100)}`}
                className="transition-all duration-300"
                style={{ filter: 'drop-shadow(0 0 6px #00C6AE)' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00C6AE]" style={{ textShadow: '0 0 15px #00C6AE' }}>
                  {formatTime(remainingSeconds)}
                </div>
                <div className="text-xs text-[#F2F4F8] opacity-70">remaining</div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3 flex-1 justify-center">
            <button
              onClick={handleStartWork}
              disabled={isWorking}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                isWorking
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#F2F4F8] text-[#1E1F3A] hover:bg-[#00C6AE] hover:text-white'
              }`}
            >
              {isWorking ? 'WORKING...' : 'START WORK'}
            </button>
            <button
              onClick={handleBreak}
              disabled={!isWorking || isOnBreak}
              className={`px-5 py-2 rounded-lg font-bold text-sm border-2 transition-all ${
                isOnBreak || !isWorking
                  ? 'border-gray-600 text-gray-600 cursor-not-allowed'
                  : 'border-[#00C6AE] text-[#F2F4F8] hover:bg-[#00C6AE] hover:text-white'
              }`}
            >
              {isOnBreak ? `BREAK: ${formatTime(breakSeconds)}` : 'TAKE BREAK'}
            </button>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="px-5 py-2 rounded-lg font-bold text-sm border border-[#F2F4F8] text-[#F2F4F8] hover:border-[#00C6AE] hover:text-[#00C6AE] transition-all"
            >
              APPLY LEAVE
            </button>
          </div>

          {/* Streak Section - Compact */}
          <div className="bg-[#1E1F3A] rounded-lg p-4 text-center w-32">
            <div className="text-xs text-gray-400 mb-1">🔥 STREAK</div>
            <div className="text-3xl font-bold text-[#00C6AE]">{workStreak}</div>
            <div className="text-xs text-gray-400">days</div>
          </div>
        </div>

        {/* Late Message */}
        {lateMessage && (
          <div className="bg-[#00C6AE] text-[#1E1F3A] px-4 py-2 rounded-lg text-center font-medium text-sm">
            {lateMessage}
          </div>
        )}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-5 gap-4 mb-4 flex-1 min-h-0">
        {/* Scratch Book */}
        <div className="col-span-3 bg-[#282A4D] rounded-xl p-4 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">
              SCRATCH BOOK
              <div className="h-0.5 w-20 bg-[#00C6AE] mt-1"></div>
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setScratchMode('text')}
                className={`p-2 rounded ${scratchMode === 'text' ? 'bg-[#00C6AE] text-white' : 'text-[#F2F4F8] hover:text-[#00C6AE]'}`}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setScratchMode('sketch')}
                className={`p-2 rounded ${scratchMode === 'sketch' ? 'bg-[#00C6AE] text-white' : 'text-[#F2F4F8] hover:text-[#00C6AE]'}`}
              >
                <PenTool className="w-4 h-4" />
              </button>
              <button className="p-2 text-[#F2F4F8] hover:text-[#00C6AE]">
                <Eraser className="w-4 h-4" />
              </button>
              <button className="p-2 text-[#F2F4F8] hover:text-[#00C6AE]">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <textarea
            value={scratchText}
            onChange={(e) => setScratchText(e.target.value)}
            placeholder="Start typing your ideas..."
            className="w-full flex-1 bg-[#1E1F3A] text-[#F2F4F8] p-3 rounded-lg border-2 border-transparent focus:border-[#00C6AE] focus:outline-none resize-none text-sm"
            style={{ boxShadow: scratchText ? '0 0 10px rgba(0, 198, 174, 0.2)' : 'none' }}
          />
        </div>

        {/* To-Do List */}
        <div className="col-span-2 bg-[#252747] rounded-xl p-4 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="w-5 h-5 text-[#00C6AE]" />
            <h2 className="text-lg font-bold">TO-DO LIST</h2>
          </div>

          {/* Add Task */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add new task..."
              className="flex-1 bg-[#1E1F3A] text-[#F2F4F8] px-3 py-2 text-sm rounded-lg border border-[#3A3C5A] focus:border-[#00C6AE] focus:outline-none"
            />
            <button
              onClick={addTodo}
              className="bg-[#00C6AE] text-white p-2 rounded-lg hover:bg-[#00D4BC] transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-2 mb-3 flex-1 overflow-y-auto">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`bg-[#F2F4F8] text-[#1E1F3A] p-2 rounded-lg flex items-center justify-between group text-sm ${
                  todo.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 accent-[#00C6AE] cursor-pointer"
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
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Task Completion</span>
              <span>{Math.round(completedPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-[#1E1F3A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00C6AE] transition-all duration-300"
                style={{ width: `${completedPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#1A1B33] border-t-2 border-[#00C6AE] rounded-xl p-3 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xs italic text-gray-400">"{dailyQuote}"</span>
        </div>
        <button className="text-[#00C6AE] hover:text-[#F2F4F8] font-medium transition-colors text-sm">
          Tomorrow's Plan →
        </button>
      </div>

      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#282A4D] rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Apply for Leave</h3>
            <input
              type="text"
              placeholder="Reason for leave..."
              className="w-full bg-[#1E1F3A] text-[#F2F4F8] px-4 py-3 rounded-lg border border-[#3A3C5A] focus:border-[#00C6AE] focus:outline-none mb-4"
            />
            <input
              type="date"
              className="w-full bg-[#1E1F3A] text-[#F2F4F8] px-4 py-3 rounded-lg border border-[#3A3C5A] focus:border-[#00C6AE] focus:outline-none mb-6"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 bg-[#00C6AE] text-white py-3 rounded-lg font-bold hover:bg-[#00D4BC] transition-all"
              >
                Submit
              </button>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 border border-[#F2F4F8] py-3 rounded-lg font-bold hover:border-[#00C6AE] hover:text-[#00C6AE] transition-all"
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

export default WorkHorseMain;