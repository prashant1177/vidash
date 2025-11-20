import React from "react";
import useStore from "../../../Store";
import { Plus } from "lucide-react";

export default function Upcoming({ handleAddEvent }) {
  const userScheduled = useStore((s) => s.userScheduled);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 h-full w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Upcoming Events</h3>
          <p className="text-xs text-zinc-500 mt-1">
            List your daily tasks here
          </p>
        </div>
        <button
          onClick={handleAddEvent}
          className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
        >
          <Plus size={18} className="text-sky-500" />
        </button>
      </div>

      {userScheduled?.length > 0 ? (
        <div className="space-y-2">
          {userScheduled.slice(0, 3).map((data, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg group"
            >
              <h3 className="text-sm">{data.title}</h3>

              <span className="text-xs ">at {data.startTime.slice(0, 5)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-600 italic text-sm py-4">No upcoming events</p>
      )}
    </div>
  );
}
