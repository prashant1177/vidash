import React, { useEffect, useState } from "react";
import Scedule from "./Scedule";
import TaskInput from "./TaskInput";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axiosClient from "../../../api/api";

export default function Calender({ setShowScedule }) {
  const [data, setdata] = useState([]);
  const [sceduled, setSceduled] = useState({});
  const [date, setDate] = useState(new Date());
  const formatDate = (d) => d.toISOString().split("T")[0];

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    setDate(newDate);
  };

  useEffect(() => {
    // Fetch scheduled tasks for the selected date from backend here
    // and update the sceduled state accordingly
    fetchSceduled();
    async function fetchSceduled() {
      const res = await axiosClient.get(`/api/schedule/${formatDate(date)}`); // Fetch from backend
      const data = res.data;
      onAdd(data);
    }
  }, [date]);

  const onAdd = (data) => {
    let j = 0;
    console.log("Scheduling data processing:", data);
    const timeColorText = Array.from({ length: 24 * 4 }, (_, i) => {
      const hour = Math.floor(i / 4);
      const minute = (i % 4) * 15;
      if (j < data.length) {
      console.log(
        data[j].startTime.slice(0, 5),
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      );
        if (
          data[j].startTime.slice(0, 5) ==
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        ) {
          return {
            time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`,
            color: data[j].color,
            text: data[j].title,
          };
        } else if (
          data[j].startTime.slice(0, 5) <
            `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}` &&
          data[j].endTime.slice(0, 5) >
            `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`
        ) {
          return {
            time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`,
            color: data[j].color,
            text: "",
          };
        }else if (
          data[j].endTime.slice(0, 5) ==
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        ) {
          return {
            time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`,
            color: data[j++].color,
          };
        } else {
          return {
            time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
              2,
              "0"
            )}`,
            color: "neutral",
            text: "",
          };
        }
      } else {
        return {
          time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
          )}`,
          color: "neutral",
          text: "",
        };
      }
    });

    setSceduled(timeColorText);
  };
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center  z-30 backdrop-blur-sm bg-black/10">
      <div className="grid grid-cols-3  h-[600px] w-5xl rounded-2xl overflow-hidden bg-neutral-950 border-2 border-neutral-900">
        <div className="col-span-1">
          <TaskInput onAdd={onAdd} />
        </div>
        <div className="col-span-2 overflow-y-scroll">
          <div className="flex justify-between items-center px-6 mt-4">
            <button
              onClick={() => changeDate(-1)}
              className=" px-4 py-2 rounded-lg font-light text-sm flex items-center gap-2 text-neutral-700"
            >
              <ChevronLeft size={16} strokeWidth={1} /> Previous
            </button>
            <h1 className="font-light  text-center text-neutral-400">
              {formatDate(date)}
            </h1>
            <button
              onClick={() => changeDate(1)}
              className=" px-4 py-2 rounded-lg font-light  text-sm flex items-center gap-2 text-neutral-800"
            >
              Next
              <ChevronRight size={16} strokeWidth={1} />
            </button>
          </div>
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
