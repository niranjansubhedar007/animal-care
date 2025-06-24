"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBars,
  faTimes,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClasses = (href) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      pathname === href
        ? "bg-[#A294F9] text-white"
        : "text-[#5E4FA2] hover:bg-[#E5D9F2] hover:text-[#5E4FA2]"
    } transition`;

  const desktopLinkClasses = (href) =>
    `pb-1 border-b-2 ${
      pathname === href
        ? "border-[#A294F9] text-[#A294F9]"
        : "border-transparent text-[#5E4FA2] hover:text-[#A294F9]"
    } font-medium transition`;

  return (
    <nav className="bg-[#F5EFFF] shadow-md fixed top-0 w-full z-50 font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/images/logo-1.png"
              className="h-16 w-auto md:h-20"
              alt="Animal Rescue Logo"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={desktopLinkClasses("/")}>
              Home
            </Link>
            <Link href="/about" className={desktopLinkClasses("/about")}>
              About
            </Link>
            <Link href="/rescue" className={desktopLinkClasses("/rescue")}>
              Rescue Stories
            </Link>
            <Link href="/how-to-help" className={desktopLinkClasses("/how-to-help")}>
              How to Help
            </Link>
            <Link href="/review" className={desktopLinkClasses("/review")}>
              Review
            </Link>
            <Link href="/volunteer" className={desktopLinkClasses("/volunteer")}>
              Volunteer
            </Link>
            <Link href="/contact" className={desktopLinkClasses("/contact")}>
              Contact
            </Link>
            <Link href="/donate">
              <button className="bg-[#A294F9] text-white px-6 py-2 rounded-full hover:bg-[#8A7BD8] transition flex items-center">
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                Donate
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#5E4FA2] hover:text-[#A294F9] focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-[#F5EFFF] shadow-lg">
          <Link 
            href="/" 
            className={linkClasses("/")}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={linkClasses("/about")}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/rescue" 
            className={linkClasses("/rescue")}
            onClick={() => setIsMenuOpen(false)}
          >
            Rescue Stories
          </Link>
          <Link 
            href="/how-to-help" 
            className={linkClasses("/how-to-help")}
            onClick={() => setIsMenuOpen(false)}
          >
            How to Help
          </Link>
          <Link 
            href="/review" 
            className={linkClasses("/review")}
            onClick={() => setIsMenuOpen(false)}
          >
            Review
          </Link>
          <Link 
            href="/volunteer" 
            className={linkClasses("/volunteer")}
            onClick={() => setIsMenuOpen(false)}
          >
            Volunteer
          </Link>
          <Link 
            href="/contact" 
            className={linkClasses("/contact")}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/donate"
            onClick={() => setIsMenuOpen(false)}
          >
            <button className="w-full mt-2 bg-[#A294F9] text-white px-6 py-2 rounded-full hover:bg-[#8A7BD8] transition flex items-center justify-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Donate
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;