import axiosClient from "../api/api";

const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const createScheduleSlice = (set, get) => ({
  sceduled: [],

  // Fetch schedule for the current date
  async fetchSceduled() {
    const dateString = get().formatDate();
    const res = await axiosClient.get(`/api/schedule/${dateString}`);
    const data = res.data;

    const scheduleData = data.map((item) => ({
      ...item,
      startMin: toMinutes(item.startTime),
      endMin: toMinutes(item.endTime)
    }));

    get().computeNextTasks(data);
    get().onAdd(scheduleData);
  },

  // Convert schedule to 96 quarter-hour blocks
  onAdd(events) {
    let j = 0;

    const slots = Array.from({ length: 96 }, (_, i) => {
      const hour = Math.floor(i / 4);
      const minute = (i % 4) * 15;
      const slotMin = hour * 60 + minute;
      const formatted = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;

      if (j < events.length) {
        const evt = events[j];

        if (slotMin === evt.startMin) {
          return {
            id: evt.id,
            time: formatted,
            color: evt.color,
            title: evt.title
          };
        }

        if (slotMin > evt.startMin && slotMin < evt.endMin) {
          return { id: evt.id, time: formatted, color: evt.color, title: "" };
        }

        if (slotMin === evt.endMin) {
          const block = {
            id: evt.id,
            time: formatted,
            color: evt.color,
            title: ""
          };
          j++;
          return block;
        }
      }

      return { time: formatted, color: "neutral", title: "" };
    });

    set({ sceduled: slots });
  },

  // Delete a schedule item
  async deleteSchedule(id) {
    await axiosClient.delete(`/api/schedule/${id}`);
    set({
      sceduled: get().sceduled.filter((item) => item.id !== id)
    });
  }
});
