import { create } from "zustand";
import axiosClient from "./api/api";
import { createCalendarSlice } from "./slices/useCalendarSlice";
import { createScheduleSlice } from "./slices/useScheduleSlice";
import { createNotebookSlice } from "./slices/useNotebookSlice";

const createUserSlice = (set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
});

const createTodoSlice = (set, get) => ({
  // STATE
  todos: [],
  newTodo: "",

  // ACTIONS
  setNewTodo: (value) => set({ newTodo: value }),

  fetchTodos: async () => {
    const res = await axiosClient.get("/api/todo");
    set({ todos: res.data });
  },

  addTodo: async () => {
    const { newTodo, todos } = get();
    if (!newTodo.trim()) return;

    const res = await axiosClient.post("/api/todo", { text: newTodo });
    set({
      todos: [...todos, res.data],
      newTodo: "",
    });
  },

  toggleTodo: async (id, currcompleted) => {
    await axiosClient.put(`/api/todo/${id}`, { completed: !currcompleted });

    set((s) => ({
      todos: s.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !currcompleted } : todo
      ),
    }));
  },

  deleteTodo: async (id) => {
    await axiosClient.delete(`/api/todo/${id}`);
    set((s) => ({
      todos: s.todos.filter((todo) => todo.id !== id),
    }));
  },

});

const useStore = create((set, get) => ({
  ...createUserSlice(set),
  ...createTodoSlice(set, get),
  ...createCalendarSlice(set, get),
  ...createScheduleSlice(set, get),
  ...createNotebookSlice(set, get),
}));

export default useStore;
