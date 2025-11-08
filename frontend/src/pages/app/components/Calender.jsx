import React, { useState } from "react";
import Scedule from "./Scedule";
import TaskInput from "./TaskInput";

const timeColorText = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i + 1).padStart(2, "0")}:00`,
  color: "bg-neutral-800",
  text: "",
}));
export default function Calender({ setShowScedule }) {
  const [sceduled, setSceduled] = useState(timeColorText);

  const onAdd = (value) => {
    const updated = sceduled.map((item) => {
      if (
        item.time.toString().slice(0, 2) == value.start.toString().slice(0, 2)
      ) {
        console.log(
          value.start.toString().slice(0, 2),
          item.time.toString().slice(0, 2)
        );
        return {
          ...item,
          color: "bg-orange-500",
          text: value.title,
        };
      } else if (item.time >= value.start && item.time <= value.end) {
        return {
          ...item,
          color: "bg-orange-500",
        };
      }
      return item;
    });

    setSceduled(updated);
  };
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center  z-30 backdrop-blur-sm bg-black/10">
      <div className="grid grid-cols-3  h-[600px] w-5xl rounded-2xl overflow-hidden ">
        <div className="col-span-1">
          <TaskInput onAdd={onAdd} />
        </div>
        <div className="col-span-2">
          <Scedule sceduled={sceduled} />
        </div>
      </div>
      <button
        onClick={() => setShowScedule(false)}
        className="bg-orange-500 px-4 py-2 rounded-lg font-light hover:bg-[#00D4BC] transition-all mt-4"
      >
        Close Scedule
      </button>
    </div>
  );
}
