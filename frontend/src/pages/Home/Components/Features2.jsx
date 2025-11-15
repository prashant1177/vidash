import React from "react";
import {
  BarChart2,
  Brain,
  CalendarCheck,
  Clipboard,
  Target,
} from "lucide-react";
import RegisterForm from "../../../Components/RegisterForm";

export default function Features2() {
  return (
    <div className="min-h-screen overflow-hidden bg-black  flex justify-center ">
      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full  text-white font-sans px-6 mt-32">
        <h1 className="text-5xl font-extralight tracking-wide leading-tight drop-shadow-lg mb-8 text-left w-full">
          Make Sure You Work Daily
        </h1>
        <div className="grid grid-cols-3 gap-8">
        <div className="grid grid-cols-2 w-full max-w-6xl mx-auto h-full gap-4  col-span-2">
          <div className="border rounded-xl border-neutral-800 backdrop-blur-3xl   w-full text-left p-8 flex flex-col gap-4">
            <CalendarCheck strokeWidth={1} size={32} />
            <div>
              <h1 className=" font-light text-white text-2xl uppercase">
                Plan Smart
              </h1>
              <p className="mt-2 font-extralight  italic text-gray-200">
                Create project timelines and daily goals.
              </p>
            </div>
          </div>
          <div className="border rounded-xl border-neutral-800 backdrop-blur-3xl   w-full text-left p-8 flex flex-col gap-4">
            <Clipboard strokeWidth={1} size={32} />
            <div>
              <h1 className=" font-light text-white text-2xl uppercase">
                Stay Organized{" "}
              </h1>
              <p className="mt-2 font-extralight  italic text-gray-200">
                Keep tasks, notes, and deadlines in one view.{" "}
              </p>
            </div>
          </div>
          <div className="border rounded-xl border-neutral-800 backdrop-blur-3xl   w-full text-left p-8 flex flex-col gap-4">
            <BarChart2 strokeWidth={1} size={32} />
            <div>
              <h1 className=" font-light text-white text-2xl uppercase">
                Track Progress{" "}
              </h1>
              <p className="mt-2 font-extralight  italic text-gray-200">
                Visualize your milestones with clean charts.{" "}
              </p>
            </div>
          </div>
          <div className="border rounded-xl border-neutral-800 backdrop-blur-3xl   w-full text-left p-8 flex flex-col gap-4">
            <Target strokeWidth={1} size={32} />
            <div>
              <h1 className=" font-light text-white text-2xl uppercase">
                Focus Mode{" "}
              </h1>
              <p className="mt-2 font-extralight  italic text-gray-200">
                Eliminate clutter and distractions while working.{" "}
              </p>
            </div>
          </div>
        </div>
        <RegisterForm/>
        </div>
      </div>
    </div>
  );
}
