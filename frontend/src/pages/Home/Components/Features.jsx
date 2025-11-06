import React from "react";
import {
  BarChart2,
  Brain,
  CalendarCheck,
  Clipboard,
  Clock,
  Target,
} from "lucide-react";
import RegisterForm from "../../../Components/RegisterForm";

export default function Features() {
  return (
    <div className="bg-black  text-white relative   px-8 py-24 ">
      <h2 className="text-4xl font-extralight tracking-wide leading-tight drop-shadow-lg mb-24 text-center">Achieve Your Goals</h2>

      <div className="grid grid-cols-2 w-full gap-8 mx-auto max-w-7xl">
        {/* Left Column */}
        <div className="grid gap-8">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900 transition">
            <h3 className="text-xl font-semibold mb-2 text-white">
              Set Schedules
            </h3>
            <p className="text-sm text-gray-300">
              Plan your day with clarity and control.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900 transition">
            <h3 className="text-xl font-semibold mb-2 text-white">
              Manage Daily Tasks
            </h3>
            <p className="text-sm text-gray-300">
              Stay on top of your to-do list effortlessly.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900 transition">
            <h3 className="text-xl font-semibold mb-2 text-white">Goals</h3>
            <p className="text-sm text-gray-300">
              Define clear milestones and measure progress.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid gap-8">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900 transition">
            <h3 className="text-xl font-semibold mb-2 text-white">
              Whiteboards
            </h3>
            <p className="text-sm text-gray-300">
              Visualize your ideas and plans collaboratively.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900 transition">
            <h3 className="text-xl font-semibold mb-2 text-white">
              Time Tracking
            </h3>
            <p className="text-sm text-gray-300">
              Keep track of every productive hour with precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
