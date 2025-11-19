
export const createCalendarSlice = (set, get) => ({
  date: new Date(),
  nextTask: {},
  userScheduled: [],
  currentTime: new Date(),

  // Update clock every second
  tickClock() {
    set({ currentTime: new Date() });
  },

  // Format YYYY-MM-DD
  formatDate(d = get().date) {
    return d.toISOString().split("T")[0];
  },

  // Change date by # of days (+1 next day, -1 prev day)
  changeDate(days) {
    const newDate = new Date(get().date);
    newDate.setDate(newDate.getDate() + days);
    set({ date: newDate });
  },

  // Compute upcoming tasks
  computeNextTasks(tasks) {
    const now = new Date();
    const upcoming = tasks.filter((t) => {
      const [h, m] = t.endTime.split(":").map(Number);
      const end = new Date();
      end.setHours(h, m, 0, 0);
      return end > now;
    });

    set({
      userScheduled: upcoming,
      nextTask: upcoming.length ? upcoming[0] : {}
    });
  }
});
