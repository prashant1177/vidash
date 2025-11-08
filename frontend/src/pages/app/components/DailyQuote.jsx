import React from 'react'

export default function DailyQuote() {

  const quotes = [
    "Discipline is choosing between what you want now and what you want most.",
    "The only way to do great work is to love what you do.",
    "Success is the sum of small efforts repeated day in and day out.",
  ];
  const dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-neutral-950 border-t-2 border-orange-500 rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="text-sm italic text-gray-400">"{dailyQuote}"</span>
        </div>
        <button className="text-orange-500 hover:text-[#F2F4F8]  transition-colors">
          Tomorrow's Plan →
        </button>
      </div>
  )
}
