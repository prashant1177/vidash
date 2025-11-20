import { CheckSquare, Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import useStore from "../../../Store";

export default function ToDoList() {
  const {
    todos,
    newTodo,
    setNewTodo,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6  h-full w-full">
      {/* Header */}
        <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Daily Goals</h3>
                  <p className="text-xs text-zinc-500 mt-1">Track your progress</p>
                </div>
              </div>

      {/* Add Task */}
         <div className="mb-3">
                <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new task..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
        />
        <button
          onClick={addTodo}
                    className="p-2 bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors"
        >
          <Plus size={18} />
        </button>

                </div>
              </div>

      {/* Task List */}
              <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
             className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg group"
          >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
                      className="w-4 h-4 accent-sky-500 cursor-pointer"
              />
              <span
              className={`flex-1 text-sm ${todo.completed ? 'line-through text-zinc-500' : ''}`}
              >
                {todo.text}
              </span>

            <button
              onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
