export default function HorizontalScroll() {
  const items = [
    { title: "Set Schedules" },
    { title: "Manage Daily Tasks" },
    { title: "Goals" },
    { title: "Whiteboards" },
    { title: "Time Tracking" },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
      <h2 className="text-3xl font-semibold mb-8">Your Workspace Tools</h2>

      {/* Scroll Container */}
      <div className="w-full max-w-4xl overflow-x-auto scroll-smooth snap-x snap-mandatory flex">
        {items.map((item, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-full h-96 flex items-center justify-center text-4xl font-bold bg-gray-800 rounded-3xl mx-2"
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
