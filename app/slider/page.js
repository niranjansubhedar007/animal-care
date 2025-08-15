"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Handshake } from 'lucide-react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = [
    {
      image: "/images/dog-hero-1.jpg",
      heading: "Rescue a Dog, Gain a Loyal Friend",
      subheading: "Every dog deserves a second chance at happiness",
    },
    {
      image: "/images/cat-hero-1.jpg",
      heading: "Save a Cat, Save Nine Lives",
      subheading: "Help us protect these independent souls",
    },
    {
      image: "/images/cow-hero-1.jpg",
      heading: "Farm Animals Need Love Too",
      subheading: "Support our sanctuary for rescued farm animals",
    },
    {
      image: "/images/monkey-hero-1.jpg",
      heading: "Protect Wildlife, Preserve Nature",
      subheading: "Rescuing and rehabilitating wild animals",
    },
    {
      image: "/images/bird-1.jpg",
      heading: "Give Wings to Hope",
      subheading: "Saving injured birds and helping them soar again",
    }
  ];
  
  const slideCount = slides.length;

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slideCount, isMobile]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slideCount - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slideCount - 1 ? 0 : prevIndex + 1
    );
  };

  if (isMobile) {
    return (
      <div className="flex flex-col bg-white mt-20">
        {slides.map((slide, index) => (
          <div key={index} className="w-full relative mb-8">
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-64 object-cover"
            />
            <div className="flex items-center justify-center text-center p-4">
              <motion.div 
                className="max-w-4xl px-6 py-8 rounded-xl backdrop-blur-sm "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {slide.heading}
                </h1>
                <p className="text-lg text-gray-700">
                  {slide.subheading}
                </p>
              </motion.div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mb-8">
          <Link href="volunteer">
            <motion.button 
              className="px-6 py-2 bg-red-500 mx-auto text-white rounded-full hover:bg-red-600 cursor-pointer transition duration-300 text-lg font-semibold text-center shadow-lg flex items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                  delay: 0.3
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                  transition: { 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    duration: 2 
                  }
                }}
              >
              </motion.span>
              Join Our Mission
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative lg:h-screen md:h-96 h-80 bg-white overflow-hidden">
      <div
        className="w-full h-full flex transition-transform duration-1000 ease-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / slideCount)}%)`,
          width: `${slideCount * 100}%`
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full relative">
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <motion.div 
                className="max-w-4xl px-8 py-10 rounded-xl backdrop-blur-[5px] bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-2xl text-white mb-8">
                  {slide.subheading}
                </p>
                <Link href="volunteer">
                  <motion.button 
                    className="px-6 py-2 bg-red-500 mx-auto text-white rounded-full hover:bg-red-600 cursor-pointer transition duration-300 text-lg font-semibold text-center shadow-lg flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                        delay: 0.4
                      }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <motion.span
                      
                    >
                    </motion.span>
                    Join Our Mission
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-[#A294F9] p-3 rounded-full hover:bg-white transition duration-300 shadow-lg hidden md:block"
        onClick={goToPrevious}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-[#A294F9] p-3 rounded-full hover:bg-white transition duration-300 shadow-lg hidden md:block"
        onClick={goToNext}
      >
        <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Slider;