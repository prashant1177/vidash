import React, { useState } from "react";
import { Bookmark, Plus, ExternalLink, Edit2, Trash2 } from "lucide-react";

const BookmarkSection = () => {
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: "GitHub", url: "https://github.com" },
    { id: 2, title: "Stack Overflow", url: "https://stackoverflow.com" },
    { id: 3, title: "YouTube", url: "https://youtube.com" },
    { id: 4, title: "Gmail", url: "https://gmail.com" },
  ]);

  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [newBookmark, setNewBookmark] = useState({ title: "", url: "" });

  const handleAddBookmark = () => {
    if (newBookmark.title && newBookmark.url) {
      const bookmark = {
        id: Date.now(),
        title: newBookmark.title,
        url: newBookmark.url.startsWith("http")
          ? newBookmark.url
          : `https://${newBookmark.url}`,
      };
      setBookmarks([...bookmarks, bookmark]);
      setNewBookmark({ title: "", url: "" });
      setShowAddBookmark(false);
    }
  };

  const handleUpdateBookmark = () => {
    if (editingBookmark && newBookmark.title && newBookmark.url) {
      setBookmarks(
        bookmarks.map((b) =>
          b.id === editingBookmark.id
            ? {
                ...b,
                title: newBookmark.title,
                url: newBookmark.url.startsWith("http")
                  ? newBookmark.url
                  : `https://${newBookmark.url}`,
              }
            : b
        )
      );
      setNewBookmark({ title: "", url: "" });
      setEditingBookmark(null);
      setShowAddBookmark(false);
    }
  };

  const handleDeleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const startEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setNewBookmark({ title: bookmark.title, url: bookmark.url });
    setShowAddBookmark(true);
  };

  return (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Bookmarks</h3>
                  <p className="text-xs text-zinc-500 mt-1">Quick access links</p>
                </div>
       
        <button
          onClick={() => {
            setEditingBookmark(null);
            setNewBookmark({ title: "", url: "" });
            setShowAddBookmark(true);
          }}
                  className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
        >
          <Plus size={18} className="text-orange-500"  />
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
                             <div key={bookmark.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg group">

              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
className="text-sm"              >
                {bookmark.title}
              </a>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(bookmark)}
className="hover:text-orange-500"                >
                  <Edit2 size={14} />
                </button>

                <button
                  onClick={() => handleDeleteBookmark(bookmark.id)}
className="hover:text-red-500"                >
                  <Trash2  size={14}  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddBookmark && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-neutral-800 shadow-xl">
            <h3 className="text-xl font-light mb-4">
              {editingBookmark ? "Edit Bookmark" : "Add New Bookmark"}
            </h3>

            <input
              type="text"
              placeholder="Title"
              value={newBookmark.title}
              onChange={(e) =>
                setNewBookmark({ ...newBookmark, title: e.target.value })
              }
              className="w-full bg-neutral-950 text-white px-4 py-3 rounded-xl border border-neutral-800 focus:border-orange-500 focus:outline-none mb-3"
            />

            <input
              type="text"
              placeholder="URL"
              value={newBookmark.url}
              onChange={(e) =>
                setNewBookmark({ ...newBookmark, url: e.target.value })
              }
              className="w-full bg-neutral-950 text-white px-4 py-3 rounded-xl border border-neutral-800 focus:border-orange-500 focus:outline-none mb-6"
            />

            <div className="flex gap-3">
              <button
                onClick={
                  editingBookmark ? handleUpdateBookmark : handleAddBookmark
                }
                className="flex-1 bg-orange-500 py-3 rounded-xl hover:bg-orange-600 font-light transition-colors"
              >
                {editingBookmark ? "Update" : "Add"}
              </button>

              <button
                onClick={() => {
                  setShowAddBookmark(false);
                  setEditingBookmark(null);
                  setNewBookmark({ title: "", url: "" });
                }}
                className="flex-1 border border-neutral-700 py-3 rounded-xl hover:border-orange-500 hover:text-orange-500 font-light transition-colors"
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
