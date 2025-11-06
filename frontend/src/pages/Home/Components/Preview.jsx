import React from "react";
import image from "../../../../public/image.png";

export default function Preview() {
  return (
    <div className=" bg-black w-full">
      <img src={image}  className="max-w-7xl mx-auto rounded-4xl transition-transform duration-300 hover:-translate-y-3 border border-neutral-900 shadow-2xl shadow-neutral-950"/>
    </div>
  );
}
