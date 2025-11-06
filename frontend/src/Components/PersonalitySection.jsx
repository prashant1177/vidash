import React from 'react'

export default function PersonalitySection() {
  return (
    <div> {/* Personality Section */}
          <div className="bg-[#1E1F3A] rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4">YOUR PRODUCTIVITY PROFILE</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#252747] rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Most Productive Time</div>
                <div className="text-xl font-bold text-[#00C6AE]">9 AM - 12 PM</div>
              </div>
              <div className="bg-[#252747] rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Average Work Hours/Day</div>
                <div className="text-xl font-bold text-[#00C6AE]">7.2 hours</div>
              </div>
              <div className="bg-[#252747] rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Tasks Completed</div>
                <div className="text-xl font-bold text-[#00C6AE]">156 this month</div>
              </div>
              <div className="bg-[#252747] rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Work Style</div>
                <div className="text-xl font-bold text-[#00C6AE]">Deep Focus</div>
              </div>
            </div>
            <div className="mt-4 bg-[#252747] rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Weekly Progress</div>
              <div className="flex gap-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className={`h-12 rounded ${i < 4 ? 'bg-[#00C6AE]' : 'bg-[#3A3C5A]'} mb-1`}></div>
                    <div className="text-xs text-gray-400">{day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div></div>
  )
}
