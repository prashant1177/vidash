import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [task, setTask] = useState({
    title: "",
    start: "",
    end: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
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
      className="flex flex-col gap-3 bg-neutral-900 px-4 pt-8 w-full mb-4 h-full "
    >
      <label className="text-sm text-gray-300">Title</label>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task name"
        className="p-2 bg-neutral-800 rounded-md text-sm focus:ring-1 focus:ring-gray-400 outline-none"
      />

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

      <button
        type="submit"
        className="mt-3 bg-gray-700 hover:bg-gray-600 text-sm py-2 rounded-md"
      >
        Add Task
      </button>
    </form>
  );
}
