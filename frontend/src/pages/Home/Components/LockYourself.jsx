import { Link } from "react-router-dom";

export default function LockYourself() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-black text-white py-32 px-6 overflow-hidden">
    
      {/* Content */}
      <div className="relative max-w-3xl z-10">
        <h1 className="text-6xl font-extralight tracking-wide leading-tight drop-shadow-lg mb-6">
          Lock Yourself In
        </h1>
        <p className="text-lg font-extralight text-neutral-100 leading-relaxed">
          Not in the literal sense, but in the discipline of commitment. When you
          deliberately cut off distractions and force yourself to follow a structure,
          you stop relying on motivation — which is fickle — and start relying on
          rules. Rules don’t care how you feel; they just demand to be followed.
          By boxing yourself into a system you can’t easily escape, you turn focus
          into habit and habit into results.
        </p>

        <div className="mt-12">
          <Link to={`/register`} className="bg-neutral-900 border border-gray-700 px-8 py-3 rounded-full text-white hover:bg-neutral-800 hover:border-gray-500 transition-all duration-200">
            Commit Now
          </Link>
        </div>
      </div>

       </section>
  );
}
