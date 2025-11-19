// store/createNotebookSlice.js
import debounce from "lodash.debounce";
import axiosClient from "../api/api";

export const createNotebookSlice = (set, get) => ({
  // STATE
  scratchText: "",
  noteId: null,

  // ACTION: fetch note
  fetchNotebook: async () => {
    const res = await axiosClient.get(`/api/notebook`);
    const note = res.data[0];

    set({
      scratchText: note?.text || "",
      noteId: note?.id || null
    });
  },

  // ACTION: save note
  saveNote: async (text) => {
    const id = get().noteId;

    if (!id) {
      // create one
      const res = await axiosClient.post(`/api/notebook`, { text });
      set({ noteId: res.data.id });
    } else {
      await axiosClient.put(`/api/notebook`, { text });
    }
  },

  // ACTION: clear
  clearNote: () => {
    set({ scratchText: "" });
    get().saveNote("");
  },

  // INTERNAL: debounced save
  debouncedSave: debounce((text) => {
    get().saveNote(text);
  }, 2000),

  // ACTION: handle text change
  setScratchText: (text) => {
    set({ scratchText: text });
    get().debouncedSave(text);
  }
});
