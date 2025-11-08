import { ArrowBigLeftIcon, ArrowRight, MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center items-center p-4 absolute top-0 text-white font-light z-10  ">
      <div className="w-full max-w-7xl flex justify-between items-center">
        <div className="">VIDASH</div>
        <ul className="absolute left-1/2 -translate-x-1/2 flex gap-8 bg-neutral-900 px-6 py-2 rounded-full items-center">
          <Link to={`/`} className="">Home</Link>
          <Link className="">Solution</Link>
          <Link className="">About</Link>
          <Link className="">Contact</Link>
        </ul>
        <Link to={`/login`} className=" px-2 py-1  text-white  flex items-center gap-1.5  cursor-pointer  transition group z-30">
          Login
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform duration-500 group-hover:translate-x-2"
          />
        </Link>
      </div>
    </div>
  );
}
