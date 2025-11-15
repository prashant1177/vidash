import React, { useEffect, useState } from "react";

export default function TimerSection() {
  const [isWorking, setIsWorking] = useState(false);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [totalWorkSeconds] = useState(1 * 60 * 60); // 8 hours
  useEffect(() => {
    let interval;
    let start = localStorage.getItem("timerStart");

    if (!start) {
      // If timer was never started, start now
      start = Date.now();
      localStorage.setItem("timerStart", start);
    } else {
      setIsWorking(true);
    }

    if (isWorking && !isOnBreak) {
      interval = setInterval(() => {
        const now = Date.now();
        setWorkSeconds(Math.floor((now - start) / 1000));

        // setWorkSeconds((prev) => prev + 1);
      }, 1000);
    } else if (isOnBreak) {
      interval = setInterval(() => {
        setBreakSeconds((prev) => {
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
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
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

  return (
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
            stroke="#f97316"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${
              2 * Math.PI * 88 * (1 - progressPercent / 100)
            }`}
            className="transition-all duration-300"
            style={{ filter: "drop-shadow(0 0 8px #f97316)" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-light text-orange-500 mb-1">
              {formatTime(remainingSeconds)}
            </div>
            <div className="text-sm text-white font-light opacity-70">
              remaining
            </div>
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
              ? "bg-neutral-900 text-gray-400 cursor-not-allowed"
              : "bg-[#F2F4F8] text-[#1E1F3A] hover:bg-orange-500 hover:text-white"
          }`}
        >
          {isWorking ? "WORKING..." : "START"}
        </button>
        <button
          onClick={handleBreak}
          disabled={!isWorking || isOnBreak}
          className={`px-6 py-3 rounded-lg font-light border-2 transition-all ${
            isOnBreak || !isWorking
              ? "border-gray-600 text-gray-600 cursor-not-allowed"
              : "border-orange-500 text-[#F2F4F8] hover:bg-orange-500 hover:text-white"
          }`}
        >
          {isOnBreak ? `BREAK: ${formatTime(breakSeconds)}` : "BREAK"}
        </button>
        {/* <button
              onClick={() => setShowLeaveModal(true)}
              className="px-6 py-3 rounded-lg font-light border border-[#F2F4F8] text-[#F2F4F8] hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              APPLY LEAVE
            </button>*/}
      </div>
    </div>
  );
}
