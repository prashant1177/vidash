import React, { useEffect, useState } from "react";
import Scedule from "./Scedule";
import TaskInput from "./TaskInput";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Calender({
  setShowScedule,
  onAdd,
  changeDate,
  date,
  sceduled,
  setSceduled,
}) {
  const formatDate = (d) => d.toISOString().split("T")[0];
  return (
    <div className="w-full flex flex-col items-center justify-center ">
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
          <button className="font-light  bg-orange-500 px-3 py-1 cursor-pointer rounded " >Add Task</button>
        </div>
      </div>
      <Scedule sceduled={sceduled} setSceduled={setSceduled} />
    </div>
  );
}
