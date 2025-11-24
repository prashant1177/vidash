import axiosClient from "../api/api";

export const createBookmarkSlice = (set, get) => ({
  bookmarks: [],

  fetchBookmarks: async () => {
    const res = await axiosClient.get(`/api/bookmark`);
    set({ bookmarks: res.data });
  },

  handleAddBookmark: async (title, url) => {
    const res = await axiosClient.post(`/api/bookmark`, { title, url });

    // Optimistic update
    set({ bookmarks: [...get().bookmarks, res.data] });
  },

  handleDeleteBookmark: async (id) => {
    await axiosClient.delete(`/api/bookmark/${id}`);

    set({
      bookmarks: get().bookmarks.filter((b) => b.id !== id),
    });
  },
});
