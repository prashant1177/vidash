import React, { useState } from "react";
import { Home, Calendar, CheckSquare, Bookmark } from "lucide-react";

export default function Sidebar({activeTab, setActiveTab }) {
  const navItems = [
    { id: "", icon: Home, label: "Home" },
    { id: "calender", icon: Calendar, label: "Calender" },
    { id: "todo", icon: CheckSquare, label: "To Do List" },
    { id: "bookmarks", icon: Bookmark, label: "Bookmarks" },
  ];

  return (
    <div className="bg-neutral-950 border-r border-neutral-900 h-screen w-64 flex flex-col shadow-lg sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-neutral-900">
        <h1 className="text-xl font-semibold text-orange-500 uppercase">V-DASH</h1>
      </div>

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
                      ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
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
      <div className="p-4 border-t border-neutral-900">
        <div className="text-xs text-gray-500 font-extralight text-center">
          Productivity Dashboard
        </div>
      </div>
    </div>
  );
}
