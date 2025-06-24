"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: "/images/dog-hero-1.jpg",
      heading: "Rescue a Dog, Gain a Loyal Friend",
      subheading: "Every dog deserves a second chance at happiness",
      color: "#F5EFFF"
    },
    {
      image: "/images/cat-hero-1.jpg",
      heading: "Save a Cat, Save Nine Lives",
      subheading: "Help us protect these independent souls",
      color: "#E5D9F2"
    },
    {
      image: "/images/cow-hero-1.jpg",
      heading: "Farm Animals Need Love Too",
      subheading: "Support our sanctuary for rescued farm animals",
      color: "#CDC1FF"
    },
    {
      image: "/images/monkey-hero-1.jpg",
      heading: "Protect Wildlife, Preserve Nature",
      subheading: "Rescuing and rehabilitating wild animals",
      color: "#A294F9"
    }
  ];
  
  const slideCount = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [slideCount]);

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

  return (
    <div className="relative lg:h-screen md:h-96 h-80 bg-white overflow-hidden mt-20">
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
              <div className="max-w-4xl px-6 py-8 rounded-xl" 
                   style={{ backgroundColor: `${slide.color}CC` }}> {/* CC = 80% opacity */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-2xl text-gray-700 mb-8">
                  {slide.subheading}
                </p>
                <Link href="volunteer">
                <button 
                  className="px-8 py-3 bg-[#A294F9] text-white rounded-full hover:bg-[#8A7BD8] transition duration-300 text-lg font-semibold shadow-lg"
                >
                  Join Our Mission
                </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
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
      
      {/* Navigation arrows */}
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