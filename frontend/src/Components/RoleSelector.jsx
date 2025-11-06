import React, { useState } from "react";
import { Code2, BarChart3, Users2, ArrowRight } from "lucide-react";

const roles = [
  {
    name: "Development",
    icon: <Code2 className="w-10 h-10 text-[#00C6AE]" />,
    description: "Build, debug, and deploy — track your coding sessions with discipline.",
  },
  {
    name: "Marketing",
    icon: <BarChart3 className="w-10 h-10 text-[#00C6AE]" />,
    description: "Plan campaigns, track outreach, and manage creative deadlines.",
  },
  {
    name: "Management",
    icon: <Users2 className="w-10 h-10 text-[#00C6AE]" />,
    description: "Coordinate teams, delegate tasks, and review progress with clarity.",
  },
];

export default function RoleSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-8 text-center tracking-wide">
        Choose Your <span className="text-[#00C6AE]">Role</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => setSelected(role.name)}
            className={`cursor-pointer border border-neutral-800 rounded-2xl p-8 bg-neutral-950 hover:bg-[#00C6AE]/10 transition-all duration-300 shadow-lg ${
              selected === role.name ? "border-[#00C6AE] scale-105" : ""
            }`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              {role.icon}
              <h2 className="text-2xl font-semibold">{role.name}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {role.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={() => onSelect(selected)}
        className={`mt-10 flex items-center gap-2 px-8 py-3 rounded-lg text-lg font-semibold transition-all ${
          selected
            ? "bg-[#00C6AE] text-black hover:bg-[#00D4BC]"
            : "bg-neutral-800 text-gray-600 cursor-not-allowed"
        }`}
      >
        Continue <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
