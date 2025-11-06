import React from 'react'
import moon from "../../../../public/moon.jpg";
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
   <div className="h-screen  bg-black relative ">
      {/* Background Image */}
      <img
        src={moon}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 "
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20"></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full text-center text-white font-sans px-6">
        <h1 className="text-6xl font-extralight tracking-wide leading-tight drop-shadow-sm">
          Your Space to Get Things Done
        </h1>
        <p className="mt-6 font-extralight text-lg italic text-gray-200 max-w-2xl leading-relaxed">
          Follow a professional schedule for your solo projects — plan, track,
          and execute your work with structure and clarity.
        </p>
        <Link to={`/app`} className="z-10 mt-10 bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-8 py-3 text-lg font-medium rounded-full shadow-lg">
          Get Started Now
        </Link>
      </div>
    </div>
  )
}
