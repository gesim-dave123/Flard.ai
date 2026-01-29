import React, { useState, useEffect } from "react";
import logo from "../assets/landing_page/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "backdrop-blur-lg  shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto object-contain filter drop-shadow-md"
          />
        </div>

        {/* Navigation Menu */}
        <ul className="hidden md:flex gap-12 flex-1 justify-center">
          <li>
            <a
              href="#home"
              className="text-gray-300 font-medium text-sm tracking-wide relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-gray-300 font-medium text-sm tracking-wide relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="text-gray-300 font-medium text-sm tracking-wide relative group"
            >
              FAQs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
        </ul>

        {/* CTA Button */}
        <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0">
          Get Started
        </button>
      </div>

      {/* Mobile Menu Toggle (optional) */}
      <div className="md:hidden px-6 pt-4">
        <ul className="flex flex-col gap-4">
          <li>
            <a
              href="#home"
              className="text-gray-900 font-medium text-sm tracking-wide"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-gray-900 font-medium text-sm tracking-wide"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="text-gray-900 font-medium text-sm tracking-wide"
            >
              Pricing
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
