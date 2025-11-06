import React from "react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center p-4 absolute top-0 text-white font-light z-10">
      <ul className="flex gap-8 bg-neutral-900 px-8 py-2 rounded-4xl">
        <li className="">Home</li>
        <li className="">Solution</li>
        <li className="">About</li>
        <li className="">Contact</li>
      </ul>
    </div>
  );
}
