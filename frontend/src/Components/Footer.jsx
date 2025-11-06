import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full bg-black text-neutral-300 py-6 ">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
    <p className="text-sm">
      © {new Date().getFullYear()} Ontrack. All rights reserved.
    </p>
    <div className="flex gap-6 text-sm">
      <a href="#" className="hover:text-white transition-colors">About</a>
      <a href="#" className="hover:text-white transition-colors">Privacy</a>
      <a href="#" className="hover:text-white transition-colors">Contact</a>
    </div>
  </div>
</footer>

  )
}
