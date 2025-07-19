"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, 
  faBars, 
  faTimes 
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

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

  // Animation variants
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { 
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const heartBeat = {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 2
    }
  };

  return (
    <nav className="bg-[#F5EFFF] shadow-md fixed top-0 w-full z-50 font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/logonew.jpg"
              className="h-10 w-auto md:h-12"
              alt="Animal Rescue Logo"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/rescue", label: "Rescue Stories" },
              { href: "/how-to-help", label: "How to Help" },
              { href: "/review", label: "Review" },
              { href: "/volunteer", label: "Volunteer" },
              { href: "/contact", label: "Contact" }
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link href={link.href} className={desktopLinkClasses(link.href)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/donate">
                <motion.button 
                  className="bg-[#EF476F] text-white px-6 py-2 rounded-full hover:bg-[#D43D63] transition flex items-center"
                  animate={pulseAnimation}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="rounded-full mr-2"
                    animate={heartBeat}
                  >
                    <FontAwesomeIcon 
                      icon={faHeart} 
                      className="text-[#FFEEEE]"
                    />
                  </motion.div>
                  Donate
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#5E4FA2] hover:text-[#A294F9] focus:outline-none"
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <div className="bg-[#E5D9F2] p-2 rounded-full">
                <FontAwesomeIcon
                  icon={isMenuOpen ? faTimes : faBars}
                  className="h-5 w-5 text-[#5E4FA2]"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-[#F5EFFF] shadow-lg">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/rescue", label: "Rescue Stories" },
            { href: "/how-to-help", label: "How to Help" },
            { href: "/review", label: "Review" },
            { href: "/volunteer", label: "Volunteer" },
            { href: "/contact", label: "Contact" }
          ].map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
            >
              <Link 
                href={link.href} 
                className={linkClasses(link.href)}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4"
          >
            <Link 
              href="/donate"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.button 
                className="w-full bg-[#EF476F] text-white px-6 py-2 rounded-full hover:bg-[#D43D63] transition flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className=" rounded-full mr-2"
                  animate={heartBeat}
                >
                  <FontAwesomeIcon 
                    icon={faHeart} 
                    className="text-[#FFEEEE]"
                  />
                </motion.div>
                Donate
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;