import { Code2, BarChart3, Users2 } from "lucide-react";
import React, { useState } from "react";

const roles = [
  {
    name: "Cold Emailing",
  },
  {
    name: "Youtube",
  },
  {
    name: "Marketing",
  },
];
export default function Upcoming({
  userScheduled,
  handleOpenSchedule,
  handleAddEvent,
}) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="bg-neutral-950  border border-neutral-900 rounded-xl p-6 shadow-lg relative col-span-2 ">
      <h2 className="text-lg  font-light mb-4 flex items-center gap-2 uppercase">
        Upcoming Events
      </h2>
      {userScheduled?.length > 0 ?
        userScheduled
          ?.slice(0, 3)
          ?.map((data, i) => (
            <div
              key={i}
              onClick={() => setSelected(data.title)}
              className={` flex justify-between mt-4 cursor-pointer border-b border-neutral-800 rounded-2xl p-4  bg-neutral-900  transition-all duration-300 shadow-lg hover:border-orange-500
                }`}
            >
              <div className="flex items-center text-center gap-4">
                <h2 className="text-sm font-extralight uppercase ">
                  {data.title}
                </h2>
              </div>
              <div>
                <span className="text-xs text-neutral-400 italic">
                  at {data.startTime.slice(0, 5)}
                </span>
              </div>
            </div>
          )) : (
          <p className=" font-extralight italic text-neutral-500 ">
            No upcoming events
          </p>
      )}
      <div className="flex items-center justify-between bottom-4 absolute w-full left-0 right-0 px-4">
        <button
          onClick={handleAddEvent}
          className="cursor-pointer mt-6 w-full bg-neutral-950 px-4 py-2 rounded-lg font-light hover:bg-neutral-900 transition-all"
        >
          ADD EVENT
        </button>{" "}
        <button
          onClick={handleOpenSchedule}
          className="cursor-pointer mt-6 w-full bg-neutral-950 px-4 py-2 rounded-lg font-light hover:bg-neutral-900 transition-all"
        >
          FULL SCHEDULE
        </button>
      </div>
    </div>
  );
}
