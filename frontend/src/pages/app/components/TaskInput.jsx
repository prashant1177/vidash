import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    color: "bg-neutral-800/30",
    all_day: false,
  });

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
    onAdd(task);
    setTask({ title: "", start: "", end: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-neutral-900 px-4 pt-8 w-full mb-4 h-full rounded-lg"
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

      {/* Start & End Times */}
      <div className="flex gap-3">
        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-300">Start</label>
          <input
            name="start"
            type="time"
            value={task.start}
            onChange={handleChange}
            className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-300">End</label>
          <input
            name="end"
            type="time"
            value={task.end}
            onChange={handleChange}
            className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none"
          />
        </div>
      </div>

      {/* All Day Toggle */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          name="all_day"
          checked={task.all_day}
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
          <option value="bg-neutral-800/30">Default</option>
          <option value="bg-orange-500/40">Orange</option>
          <option value="bg-green-500/40">Green</option>
          <option value="bg-blue-500/40">Blue</option>
          <option value="bg-purple-500/40">Purple</option>
          <option value="bg-pink-500/40">Pink</option>
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
