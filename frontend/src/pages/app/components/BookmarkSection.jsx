import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import useStore from "../../../Store";

const BookmarkSection = () => {
  const { fetchBookmarks, bookmarks, handleAddBookmark, handleDeleteBookmark } =
    useStore();

  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [newBookmark, setNewBookmark] = useState({ title: "", url: "" });

  const submitBookmark = async () => {
    await handleAddBookmark(newBookmark.title, newBookmark.url);

    setNewBookmark({ title: "", url: "" });
    setShowAddBookmark(false);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Bookmarks</h3>
          <p className="text-xs text-zinc-500 mt-1">Quick access links</p>
        </div>

        <button
          onClick={() => {
            setNewBookmark({ title: "", url: "" });
            setShowAddBookmark(true);
          }}
          className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
        >
          <Plus size={18} className="text-sky-500" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {bookmarks.length === 0 ? (
          <div className="text-center text-neutral-500 py-8 font-light">
            No bookmarks yet.
          </div>
        ) : (
          bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg group"
            >
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                {bookmark.title}
              </a>

              <button
                onClick={() => handleDeleteBookmark(bookmark.id)}
                className="hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddBookmark && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-neutral-800 shadow-xl">
            <h3 className="text-xl font-light mb-4">Add New Bookmark</h3>

            <input
              type="text"
              placeholder="Title"
              value={newBookmark.title}
              onChange={(e) =>
                setNewBookmark({ ...newBookmark, title: e.target.value })
              }
              className="w-full bg-neutral-950 text-white px-4 py-3 rounded-xl border border-neutral-800 focus:border-sky-500 focus:outline-none mb-3"
            />

            <input
              type="text"
              placeholder="URL"
              value={newBookmark.url}
              onChange={(e) =>
                setNewBookmark({ ...newBookmark, url: e.target.value })
              }
              className="w-full bg-neutral-950 text-white px-4 py-3 rounded-xl border border-neutral-800 focus:border-sky-500 focus:outline-none mb-6"
            />

            <div className="flex gap-3">
              <button
                onClick={submitBookmark}
                className="flex-1 bg-sky-500 py-3 rounded-xl hover:bg-sky-600 font-light transition-colors"
              >
                Add
              </button>

              <button
                onClick={() => {
                  setShowAddBookmark(false);
                  setNewBookmark({ title: "", url: "" });
                }}
                className="flex-1 border border-neutral-700 py-3 rounded-xl hover:border-sky-500 hover:text-sky-500 font-light transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkSection;
