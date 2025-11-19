import { Eraser } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import axiosClient from "../../../api/api";
import useStore from "../../../Store";

export default function NoteBook() {
  const scratchText = useStore((s) => s.scratchText);
  const setScratchText = useStore((s) => s.setScratchText);
  const clearNote = useStore((s) => s.clearNote);
  const fetchNotebook = useStore((s) => s.fetchNotebook);

  useEffect(() => {
    fetchNotebook();
  }, [fetchNotebook]);


  return (
            <div className="col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Planning Notes</h3>
      <textarea
        value={scratchText}
        onChange={(e) => setScratchText(e.target.value)}
                placeholder="Write your random thoughts here..."
                className="w-full h-48  bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm focus:outline-none focus:border-orange-500 resize-none"
       
      />
    </div>
  );
}