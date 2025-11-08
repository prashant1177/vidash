import React, { useState } from 'react'

export default function StreakSection() {
  const [workStreak, setWorkStreak] = useState(12);
  return (
    <div className=" border border-neutral-900  rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-light mb-4 flex items-center gap-2">
              WORK STREAK
            </h2>
            <div className="text-center">
              <div className="text-5xl font-light text-orange-500 mb-2">
                {workStreak}
              </div>
              <div className="text-sm text-gray-400 font-extralight">
                consecutive days
              </div>
              <div className="mt-4 pt-4 border-t border-[#3A3C5A]">
                <div className="text-sm text-gray-400 mb-2 font-extralight">
                  This Month
                </div>
                <div className="text-2xl font-light text-[#F2F4F8]">
                  23 days
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#3A3C5A]">
                <div className="text-sm text-gray-400 mb-2 font-extralight">
                  Longest Streak
                </div>
                <div className="text-2xl font-light text-orange-500">
                  45 days
                </div>
              </div>
            </div>
          </div>
  )
}
