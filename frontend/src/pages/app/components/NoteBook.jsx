import { Eraser } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import axiosClient from "../../../api/api";

export default function NoteBook() {
  const [scratchText, setScratchText] = useState("");
  const [note, setNote] = useState(true);

  useEffect(() => {
    // Fetch existing notebook text from backend when component mounts
    async function fetchNotebook() {
      let res = await axiosClient.get(`/api/notebook`);
      setScratchText(res.data[0]?.text || "");
      setNote(res.data[0].id || false);
    }
    fetchNotebook();
  }, []);

  const saveNote = async (text) => {
    try {
      if (!note) {
        await axiosClient.post(`/api/notebook`, { text });
      } else {
        await axiosClient.put(`/api/notebook`, { text });
      }
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const clearNote = () => {
    setScratchText("");
    saveNote("");
  }

  // Create debounced function with useRef to maintain the same instance
  const debouncedSave = useRef(
    debounce((text) => {
      saveNote(text);
    }, 2000)
  ).current;

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setScratchText(newText);
    debouncedSave(newText);
  };

  return (
    <div className="col-span-2 bg-neutral-950 rounded-xl p-4 shadow-xl h-full flex flex-col">
    
      <textarea
        value={scratchText}
        onChange={handleTextChange}
        placeholder="Start typing your ideas..."
        className="font-extralight w-full h-full bg-black text-neutral-400  focus:text-neutral-100 p-4 rounded-lg border border-neutral-950  focus:outline-none"
       
      />
    </div>
  );
}