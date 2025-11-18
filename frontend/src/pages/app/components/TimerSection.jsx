import React, { useEffect, useState } from "react";

export default function TimerSection({ nextTask, currentTime }) {
  const [totalWorkSeconds, setTotalWorkSeconds] = useState(0);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [currTask, setCurrTask] = useState("");
  const [currTaskTiming, setCurrTaskTiming] = useState("");

  // Convert time string (HH:MM:SS) to seconds since midnight
  function timeToSeconds(timeStr) {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + (s || 0);
  }

  // Get current time in HH:MM:SS format
  function getCurrentTimeString(date) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (!nextTask || !nextTask.startTime || !nextTask.endTime || !currentTime) {
      setTotalWorkSeconds(0);
      setWorkSeconds(0);
      setRemainingSeconds(0);
      return;
    }

    // Calculate total work window (endTime - startTime)
    const startSeconds = timeToSeconds(nextTask.startTime);
    const endSeconds = timeToSeconds(nextTask.endTime);
    const total = endSeconds - startSeconds;
    setTotalWorkSeconds(total);

    // Get current time as seconds
    const currTimeStr = getCurrentTimeString(currentTime);
    const currentSeconds = timeToSeconds(currTimeStr);

    if (currentSeconds < startSeconds) {
      setWorkSeconds(0);
      setRemainingSeconds(0);
      setCurrTask("No current event");
      return;
    }
    // Time elapsed since start (currentTime - startTime)
    const elapsed = Math.max(0, currentSeconds - startSeconds);

    // Time remaining until end (endTime - currentTime)
    const remaining = Math.max(0, endSeconds - currentSeconds);

    setWorkSeconds(elapsed);
    setRemainingSeconds(remaining);
    setCurrTask(nextTask.title || "Current Event");
    setCurrTaskTiming(`${nextTask.startTime?.slice(0, 5)} - ${nextTask.endTime?.slice(0, 5)}`)
  }, [nextTask, currentTime]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  // Progress percentage: (elapsed / total) * 100
  const progressPercent =
    totalWorkSeconds > 0
      ? Math.min(100, (workSeconds / totalWorkSeconds) * 100)
      : 0;

  return (
    <div className="bg-neutral-950  border border-neutral-900 rounded-xl p-6 shadow-lg flex flex-col items-center  justify-center h-full">
      <div className="relative mb-4 z-0">
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

      {/* Task Info */}
      {nextTask && (
        <div className="text-center">
          <div className="text-lg font-light text-white mb-1">
            {currTask}
          </div>
          <div className="text-sm font-extralight text-gray-400">
            {currTaskTiming}
          </div>
        </div>
      )}
    </div>
  );
}
