

export default function Scedule( {sceduled}) {
  return (

    <div className="w-full grid space-y-1 bg-neutral-950 py-8 px-4 "> 
      {sceduled.map((data, i) => (
        <div key={i} className="h-20 flex items-center pl-2 gap-2">
          <span className=" text-xs text-neutral-400">{data.time}</span>
          {/* scheduled event goes here */}
          <span
            className={`p-4 line-clamp-1  rounded w-full outline-0 ${data.color} focus:${data.color} hover:${data.color}  px-2 transition-all duration-300 font-extralight h-full`}
          >
            {data.text}
          </span>
        </div>
      ))}
    </div>
  );
}
