import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#B5992B] text-[#051D41] text-xs sm:text-sm py-2 px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-center">
        <span>📍6014 Jesus St, Angeles, Pampanga</span>
        <span>GOLDENBEAR JEWELRIES</span>
        <span>📞 +63 912 345 6789</span>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-[#051D41]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="bg-white rounded-full p-2">
            <img
              src="/tablogo.png"
              alt="GoldenBear Logo"
              className="h-10 w-10 object-contain"
            />
          </div>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-white focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* Navigation Links (Desktop) */}
          <ul
            className="hidden sm:flex space-x-6 text-sm md:text-base font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <li>
              <a href="#hero" className="text-white hover:text-[#B5992B]">
                Home
              </a>
            </li>
            <li>
              <a href="#catalog" className="text-white hover:text-[#B5992B]">
                Shop
              </a>
            </li>
            <li>
              <a href="#about" className="text-white hover:text-[#B5992B]">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white hover:text-[#B5992B]">
                Contact
              </a>
            </li>
          </ul>

          {/* Social Links (Desktop) */}
          <div className="hidden sm:flex space-x-4">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white hover:text-[#B5992B]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="mailto:yourshop@email.com"
              className="flex items-center space-x-2 text-white hover:text-[#B5992B]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13l8-7v-.01H4z" />
              </svg>
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden bg-[#051D41] px-4 pb-4 space-y-3 text-center">
            <a href="#hero" className="block text-white hover:text-[#B5992B]">
              Home
            </a>
            <a
              href="#catalog"
              className="block text-white hover:text-[#B5992B]"
            >
              Shop
            </a>
            <a href="#about" className="block text-white hover:text-[#B5992B]">
              About
            </a>
            <a
              href="#contact"
              className="block text-white hover:text-[#B5992B]"
            >
              Contact
            </a>
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white hover:text-[#B5992B]"
            >
              Facebook
            </a>
            <a
              href="mailto:yourshop@email.com"
              className="block text-white hover:text-[#B5992B]"
            >
              Email
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
