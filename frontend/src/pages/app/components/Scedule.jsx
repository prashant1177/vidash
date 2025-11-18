import { Trash2 } from "lucide-react";
import axiosClient from "../../../api/api";

export default function Scedule({ sceduled, setSceduled }) {
  const colorMap = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    green: "bg-green-500",
    neutral: "bg-neutral-900",
  };

  const handleDelete = async (id) => {
    await axiosClient.delete(`/api/schedule/${id}`);
    // Optionally, you might want to refresh the schedule list here after deletion
    setSceduled(sceduled.filter((scedule) => scedule.id !== id));
  };
  return (
    <div className="w-full grid   bg-neutral-950  px-4 pt-2 pb-8">
      {sceduled.map((data, i) => (
        <div
          key={i}
          className={`h-12 flex items-start  pl-2 space-x-2 group 
      `}
        >
          <span
            className={`text-xs ${
              data.time.slice(3, 5) == "00"
                ? "text-neutral-400"
                : "text-neutral-800"
            }`}
          >
            {data.time.slice(0, 5)}
          </span>

          {/* scheduled event goes here */}
          <div
            className={`flex
        text-xs h-full ${data.id ? "" : "border-b border-t border-neutral-950"}  line-clamp-1 w-full ${
              colorMap[data.color]
            }  p-2 transition-all duration-300 font-extralight`}
          >
            {data.title}{" "}
            {data.id && (
              <button
                onClick={() => handleDelete(data.id)}
                className="text-xs ms-auto text-neutral-900/0  group-hover:text-neutral-900 cursor-pointer transition-all duration-300"
              >
                {" "}
                <Trash2 className="w-4 h-4" />{" "}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
