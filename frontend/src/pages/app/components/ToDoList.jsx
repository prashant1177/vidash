import { CheckSquare, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export default function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedPercent =
    todos.length > 0
      ? (todos.filter((t) => t.completed).length / todos.length) * 100
      : 0;

  return (
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
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add new task..."
              className="font-extralight flex-1 bg-neutral-950 text-[#F2F4F8] px-4 py-2 rounded-lg border border-[#3A3C5A] focus:border-orange-500 focus:outline-none"
            />
            <button
              onClick={addTodo}
              className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-all"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-neutral-950 text-white p-3 rounded-lg flex items-center justify-between group ${
                  todo.completed ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 accent-orange-500 cursor-pointer font-extralight"
                  />
                  <span className={todo.completed ? "line-through" : ""}>
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
  )
}
