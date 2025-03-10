"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white w-screen z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-wide">
            CodeReviewerAI
          </Link>

          {/* Menu Button for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-400 transition">Home</Link>
            <Link href="/about" className="hover:text-gray-400 transition">About</Link>
            <Link href="/services" className="hover:text-gray-400 transition">Services</Link>
            <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
            <Link href="/codereviewerai-analyze" className="hover:text-gray-400 transition">Files Lists</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-2 px-4 space-y-2">
          <Link href="/" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/services" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/contact" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/codereviewerai-analyze" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>Files Lists</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
