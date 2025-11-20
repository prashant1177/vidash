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
    setCurrTaskTiming(
      `${nextTask.startTime?.slice(0, 5)} - ${nextTask.endTime?.slice(0, 5)}`
    );
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
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">Work Timer</h3>

      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
                      stroke="#27272a"
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
              className="transition-all duration-1000"
            />
          </svg>
          <div className="text-center">
            <div className="text-4xl font-bold font-mono text-sky-500">
              {formatTime(remainingSeconds)}
            </div>
            <div className="text-xs text-zinc-500 mt-1"> remaining</div>
          </div>
        </div>
      </div>

      {/* Task Info */}
      {nextTask && (
        <div className="text-center">
          <div className="text-lg font-light text-white mb-1">{currTask}</div>
          <div className="text-sm font-extralight text-gray-400">
            {currTaskTiming}
          </div>
        </div>
      )}
    </div>
  );
}
