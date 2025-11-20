import React, { useEffect, useRef, useState } from "react";
import Scedule from "./Scedule";
import TaskInput from "./TaskInput";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useStore from "../../../Store";

export default function Calender({handleAddEvent}) {
  const date = useStore((s) => s.date);
  const changeDate = useStore((s) => s.changeDate);
  const formatDate = (d) => d.toISOString().split("T")[0];const containerRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours(); // 0–23
    const percent = hour / 32;

    const box = containerRef.current;
    if (box) {
      box.scrollTo({
        top: box.scrollHeight * percent,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef} className="w-full  h-screen overflow-y-auto flex flex-col items-center justify-center ">
      <div className="sticky top-0 w-full py-2 bg-neutral-950 border-b border-neutral-900">
        <div className="flex justify-between items-center px-6 ">
          <div className="flex gap-4">
            <button
              onClick={() => changeDate(-1)}
              className=" text-neutral-600"
            >
              <ChevronLeft size={24} strokeWidth={1} />
            </button>
            <button onClick={() => changeDate(1)} className=" text-neutral-600">
              <ChevronRight size={24} strokeWidth={1} />
            </button>
            <h1 className="font-light  text-center text-neutral-400">
              {formatDate(date)}
            </h1>
          </div>
          <button onClick={handleAddEvent} className="font-light  bg-sky-500 px-3 py-1 cursor-pointer rounded " >Add Task</button>
        </div>
      </div>
      <Scedule />
    </div>
  );
}
