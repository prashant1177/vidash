import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="h-screen  relative heroBackground overflow-hidden">
      {/* Background Image 
      <img
        src={moon}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 "
      /> 
      <img
        src={homeImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-90 -z-10"
      />*/}
      <div class="container1 inset-0  -z-10  absolute "></div>
      <div className="bg-gradient-to-t from-black  to-transparent absolute inset-0 w-full h-full -z-10"></div>

      {/* Content backdrop-blur-xs  */}
      <div className=" flex flex-col items-center justify-center h-full text-center  font-sans">
        <div className="w-fit h-fit flex flex-col items-center justify-center px-6 py-16 rounded-2xl ">
          <h1 className="text-neutral-50 text-6xl   font-extralight tracking-wide leading-tight drop-shadow-sm  border-b-2 border-neutral-800  cursor-grab active:cursor-grabbing  hover:backdrop-blur-xs transition duration-1000 px-6 py-4 rounded-xl">
            Your Space to Get Things Done
          </h1>
          <p className="mt-6 font-extralight text-xl italic text-neutral-200 max-w-4xl leading-relaxed">
            Follow a professional schedule for your solo projects — plan, track,
            and execute your work with structure and clarity.
          </p>
          <Link
            to={`/register`}
            className="mt-16 bg-orange-500 text-neutral-800 border-neutral-800 hover:border-6  transition-all duration-200 px-8 py-3 text-lg font-medium rounded-full shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
