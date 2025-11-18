import { create } from 'zustand';

const createUserSlice = (set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
});

const createTodoSlice = (set) => ({
  todos: [],
  addTodo: (t) => set((s) => ({ todos: [...s.todos, t] })),
});


const useStore = create((set) => ({
  ...createUserSlice(set),
  ...createTodoSlice(set),
}));

export default useStore;
