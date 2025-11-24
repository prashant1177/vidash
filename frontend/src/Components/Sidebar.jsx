import React, { useState } from "react";
import { Home, Calendar, CheckSquare, Bookmark, LogOut } from "lucide-react";
import useStore from "../Store";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { logoutUser } = useStore();
  const navItems = [
    { id: "", icon: Home, label: "Home" },
    { id: "calender", icon: Calendar, label: "Calender" },
    { id: "todo", icon: CheckSquare, label: "To Do List" },
    { id: "bookmarks", icon: Bookmark, label: "Bookmarks" },
  ];

  return (
    <div className="bg-neutral-950 border-r border-neutral-900 h-screen w-64 flex flex-col shadow-lg fixed left-0 top-0">
      {/* Header */}
      <a href="/" className="p-6">
        <span className="bg-gradient-to-br from-sky-500 to-sky-300 bg-clip-text text-transparent font-bold text-xl">
          V-DASH
        </span>
      </a>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-sky-500/10 text-sky-500 border border-sky-500/20"
                      : "text-gray-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-light">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-900 space-y-3">
        <button
          onClick={logoutUser}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 transition-all duration-200"
        >
          <LogOut size={18} />
          <span className="font-light">Logout</span>
        </button>
        <div className="text-xs text-gray-500 font-extralight text-center">
          Productivity Dashboard
        </div>
      </div>
    </div>
  );
}
