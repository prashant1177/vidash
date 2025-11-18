import React, { useState } from "react";
import { Bookmark, Plus, ExternalLink, Edit2, Trash2 } from "lucide-react";

const BookmarkSection = () => {
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: "GitHub", url: "https://github.com",  },
    { id: 2, title: "Stack Overflow", url: "https://stackoverflow.com", },
    { id: 3, title: "YouTube", url: "https://youtube.com",  },
    { id: 4, title: "Gmail", url: "https://gmail.com", }
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
        favicon: "🔗"
      };
      setBookmarks([...bookmarks, bookmark]);
      setNewBookmark({ title: "", url: "" });
      setShowAddBookmark(false);
    }
  };

  const handleUpdateBookmark = () => {
    if (editingBookmark && newBookmark.title && newBookmark.url) {
      setBookmarks(
        bookmarks.map(b =>
          b.id === editingBookmark.id
            ? {
                ...b,
                title: newBookmark.title,
                url: newBookmark.url.startsWith("http")
                  ? newBookmark.url
                  : `https://${newBookmark.url}`
              }
            : b
        )
      );
      setNewBookmark({ title: "", url: "" });
      setEditingBookmark(null);
      setShowAddBookmark(false);
    }
  };

  const handleDeleteBookmark = id => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const startEdit = bookmark => {
    setEditingBookmark(bookmark);
    setNewBookmark({ title: bookmark.title, url: bookmark.url });
    setShowAddBookmark(true);
  };

  return (
    <div className="bg-neutral-950 border border-neutral-900 text-white p-6 rounded-xl shadow-2xl h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-light uppercase tracking-wider">Bookmarks</h2>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto flex flex-wrap gap-2">
        {bookmarks.length === 0 ? (
          <div className="text-center text-white/40 py-8 font-light">
            No bookmarks yet. Add your first one!
          </div>
        ) : (
          bookmarks.map(bookmark => (
            <div
              key={bookmark.id}
              className="group bg-neutral-900 hover:bg-neutral-800 rounded-lg p-2 flex items-center justify-between  gap-2 transition-all"
            >
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                  <div className="font-light truncate text-xs lowercase">{bookmark.title}</div>
              </a>
                <button
                  onClick={() => startEdit(bookmark)}
                  className="p-1 hover:bg-orange-500/20 rounded"
                >
                  <Edit2 className="w-3 h-3 text-orange-500" />
                </button>
            </div>
          ))
        )}
      </div>

      {/* Add Bookmark Button */}
      <button
        onClick={() => {
          setEditingBookmark(null);
          setNewBookmark({ title: "", url: "" });
          setShowAddBookmark(true);
        }}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-light hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Bookmark
      </button>

      {/* Add/Edit Bookmark Modal */}
      {showAddBookmark && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-xl p-6 max-w-md w-full mx-4 border border-white/10 ">
            <h3 className="text-xl font-light mb-4">
              {editingBookmark ? "Edit Bookmark" : "Add New Bookmark"}
            </h3>
            <input
              type="text"
              placeholder="Title (e.g., GitHub)"
              value={newBookmark.title}
              onChange={e =>
                setNewBookmark({ ...newBookmark, title: e.target.value })
              }
              className="w-full bg-black text-white px-4 py-3 rounded-lg border border-white/10 focus:border-orange-500 focus:outline-none mb-3"
            />
            <input
              type="text"
              placeholder="URL (e.g., github.com)"
              value={newBookmark.url}
              onChange={e =>
                setNewBookmark({ ...newBookmark, url: e.target.value })
              }
              className="w-full bg-black text-white px-4 py-3 rounded-lg border border-white/10 focus:border-orange-500 focus:outline-none mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={editingBookmark ? handleUpdateBookmark : handleAddBookmark}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-light hover:bg-orange-600 transition-all"
              >
                {editingBookmark ? "Update" : "Add"}
              </button>
              <button
                onClick={() => {
                  setShowAddBookmark(false);
                  setEditingBookmark(null);
                  setNewBookmark({ title: "", url: "" });
                }}
                className="flex-1 border border-white/20 py-3 rounded-lg font-light hover:border-orange-500 hover:text-orange-500 transition-all"
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
