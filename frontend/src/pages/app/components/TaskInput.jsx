import { useState, useEffect } from "react";
import axiosClient from "../../../api/api";
const timeOptions = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 15) {
    const hour = String(h).padStart(2, "0");
    const minute = String(m).padStart(2, "0");
    timeOptions.push(`${hour}:${minute}`);
  }
}
export default function TaskInput() {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getNextHour = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const today = new Date().toISOString().split("T")[0];

  const [task, setTask] = useState({
    title: "",
    description: "",
    date: today,
    startTime: getCurrentTime(),
    endTime: getNextHour(),
    color: "orange",
    allDay: false,
  });

  useEffect(() => {
    // Update times on mount so they're always current
    setTask((prev) => ({
      ...prev,
      start: getCurrentTime(),
      end: getNextHour(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.start || !task.end) return;
    const res = axiosClient.post("/api/schedule", task);
    console.log(res.data);
    setTask({
      title: "",
      description: "",
      date: today,
      startTime: getCurrentTime(),
      endTime: getNextHour(),
      color: "orange",
      allDay: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-neutral-900 px-4 py-8 w-full mb-4 h-full rounded-lg"
    >
      {/* Title */}
      <label className="text-sm text-gray-300">Title</label>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task name"
        className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none"
      />

      {/* Description */}
      <label className="text-sm text-gray-300">Description</label>
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Add a note about this task..."
        rows={3}
        className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none resize-none"
      />

      {/* Date Picker */}
      <label className="text-sm text-gray-300">Date</label>
      <input
        type="date"
        name="date"
        value={task.date}
        onChange={handleChange}
        className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none cursor-pointer"
      />

      {/* Start & End Times */}
      <div className="flex gap-3">
        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-300">Start</label>
             <select
      name="startTime"
      value={task.startTime}
      onChange={handleChange}
      className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none"
    >
      {timeOptions.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-300">End</label>
           <select
      name="endTime"
      value={task.endTime}
      onChange={handleChange}
      className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none"
    >
      {timeOptions.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
        </div>
      </div>

      {/* All Day Toggle */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          name="allDay"
          checked={task.allDay}
          onChange={handleChange}
          className="accent-orange-500 cursor-pointer"
        />
        <label className="text-sm text-gray-300">All Day</label>
      </div>

      {/* Color */}
      <div className="flex flex-col mt-2">
        <label className="text-sm text-gray-300">Event Color</label>
        <select
          name="color"
          value={task.color}
          onChange={handleChange}
          className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none cursor-pointer"
        >
          <option value="orange">Default</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="pink">Pink</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 bg-orange-500/80 hover:bg-orange-500 text-sm py-2 rounded-md transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}
