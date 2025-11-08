import { Code2,BarChart3, Users2 } from 'lucide-react';
import React, { useState } from 'react'

const roles = [
  {
    name: "Development",
    icon: <Code2 className="w-8 h-8 text-orange-500" />,
  },
  {
    name: "Marketing",
    icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
  },
  {
    name: "Management",
    icon: <Users2 className="w-8 h-8 text-orange-500" />,
  },
];
export default function Upcoming({}) {
  const [selected, setSelected] = useState(null);
  return (
    <div className=" border border-neutral-900 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg  font-light mb-4 flex items-center gap-2">
              Upcoming Events
            </h2>
            {roles.map((role, index) => (
              <div
                key={index}
                onClick={() => setSelected(role.name)}
                className={`mt-4 cursor-pointer border border-neutral-800 rounded-2xl p-4  bg-neutral-950 hover:bg-orange-500/10 transition-all duration-300 shadow-lg ${
                  selected === role.name ? "border-orange-500 " : ""
                }`}
              >
                <div className="flex items-center text-center gap-4">
                  {role.icon}
                  <h2 className="text-md font-extralight">{role.name}</h2>
                </div>
              </div>
            ))}
          </div>
  )
}
