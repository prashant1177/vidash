export default function Scedule({ sceduled }) {
  const colorMap = {
    red: "bg-red-800/20",
    orange: "bg-orange-500/80",
    neutral: "bg-neutral-800/20",
  };
  return (
    <div className="w-full grid   bg-neutral-950 py-8 px-4">
      {sceduled.map((data, i) => (
        <div
          key={i}
          className={` h-5 flex items-start pl-2 space-x-2 
      `}
        >
          <span
            className={`text-xs ${
              data.time.toString().slice(3) == "00"
                ? "text-neutral-400"
                : "text-neutral-800"
            }`}
          >
            {data.time}
          </span>

          {/* scheduled event goes here */}
          <span
            className={` 
        text-xs h-full  line-clamp-1 w-full outline-0 ${colorMap[data.color]} focus:${data.color} hover:${data.color}  px-2 transition-all duration-300 font-extralight`}
          >
            {data.text}
          </span>
        </div>
      ))}
    </div>
  );
}
