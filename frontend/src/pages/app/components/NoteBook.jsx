import { Edit2, Eraser, History } from 'lucide-react';
import React, { useState } from 'react'

export default function NoteBook() {
  const [scratchMode, setScratchMode] = useState("text");
  const [scratchText, setScratchText] = useState("");
  return (
    
        <div className="col-span-3 bg-neutral-950 rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-light">
              SCRATCH BOOK
              <div className="h-0.5 w-24 bg-orange-500 mt-1"></div>
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setScratchMode("text")}
                className={`p-2 rounded ${
                  scratchMode === "text"
                    ? "bg-orange-500 text-white"
                    : "text-[#F2F4F8] hover:text-orange-500"
                }`}
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setScratchMode("history")}
                className={`p-2 rounded ${
                  scratchMode === "history"
                    ? "bg-orange-500 text-white"
                    : "text-[#F2F4F8] hover:text-orange-500"
                }`}
              >
                <History className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#F2F4F8] hover:text-orange-500">
                <Eraser className="w-5 h-5" />
              </button>
            </div>
          </div>
          <textarea
            value={scratchText}
            onChange={(e) => setScratchText(e.target.value)}
            placeholder="Start typing your ideas..."
            className="font-extralight w-full h-96 bg-black text-[#F2F4F8] p-4 rounded-lg border-2 border-transparent focus:border-orange-500 focus:outline-none resize-none"
            style={{
              boxShadow: scratchText
                ? "0 0 10px rgba(0, 198, 174, 0.2)"
                : "none",
            }}
          />
        </div>
  )
}
