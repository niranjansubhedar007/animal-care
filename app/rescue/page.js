"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faPaw, faUser, faCalendarAlt, faArrowRight, 
  faTimes, faMapMarkerAlt, faArrowLeft, faUsers,
  faHandsHelping, faClipboardList, faMedal
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../navbar/page';
import Link from 'next/link';
import Footer from '../footer/page';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Locations in Mumbai/Thane for random selection
const locations = [
  "Thane Station", "Ghodbunder Road", "Hiranandani Estate", "Kolshet Road", 
  "Majiwada", "Pokhran Road", "Mulund", "Nahur", "Bhandup", "Ghatkopar",
  "Vashi", "Kopar Khairane", "Airoli", "Rabale", "Sanpada", "Turbhe"
];

const Rescue = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' or 'single'
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  };

  // Sample rescue stories data with location
  const stories = [
    // Dogs
    {
      id: 1,
      title: "From Broken Leg to Loving Home",
      animal: "Dog",
      date: "March 15, 2023",
      image: "/images/dogRescue-1.webp",
      excerpt: "Found with a fractured hind leg, scared and malnourished, Max underwent surgery and months of rehabilitation.",
      fullStory: "Our team received a call about a limping stray. When we arrived, we found Max hiding under a car, clearly in pain. After gently coaxing him out, we rushed him to our veterinary partner. X-rays revealed a complex fracture that needed immediate surgery. After the operation, Max spent 8 weeks in foster care with one of our volunteers, receiving physiotherapy and learning to trust humans again.",
      location: "Thane Station"
    },
    {
      id: 2,
      title: "Abandoned Puppy Finds New Family",
      animal: "Dog",
      date: "April 2, 2023",
      image: "/images/dogRescue-2.jpg",
      excerpt: "Left in a cardboard box during monsoon rains, this puppy was hours from death when found.",
      fullStory: "A shopkeeper near Ghodbunder Road heard faint whimpers coming from a soggy cardboard box. Inside was a tiny puppy, barely 4 weeks old, shivering and weak from hunger. Our team rushed him to our facility where he received round-the-clock care. After gaining strength, he was adopted by a family with two children who adore him.",
      location: "Ghodbunder Road"
    },

    // Cats
    {
      id: 3,
      title: "Blind Cat Finds Visionary Love",
      animal: "Cat",
      date: "January 5, 2023",
      image: "/images/catRescue-1.jpg",
      excerpt: "Completely blind and abandoned, Luna was deemed 'unadoptable' until a special family saw her true beauty.",
      fullStory: "Luna was brought to us by a college student who found her struggling to navigate a busy marketplace. Our vet diagnosed her with congenital blindness. Many potential adopters passed her over, until the Kapoor family met her. They had experience with special needs pets and recognized Luna's incredible adaptability.",
      location: "Hiranandani Estate"
    },
    {
      id: 4,
      title: "Fire Survivor Kitten Thrives",
      animal: "Cat",
      date: "August 17, 2023",
      image: "/images/catRescue-2.jpg",
      excerpt: "Rescued from a warehouse fire with severe burns, this kitten made a miraculous recovery.",
      fullStory: "When firefighters responded to a warehouse blaze in Turbhe, they found a litter of kittens in the rubble. Only one survived, with severe burns on her paws and face. Our veterinary team performed skin grafts and provided months of care. Today, she lives with a nurse who specializes in burn victims and helps socialize other rescued cats.",
      location: "Turbhe"
    },

    // Monkeys
    {
      id: 5,
      title: "Urban Monkey Rehabilitated",
      animal: "Monkey",
      date: "November 22, 2022",
      image: "/images/monkeyRescue-1.jpg",
      excerpt: "A rhesus macaque injured by electrical wires was successfully treated and released.",
      fullStory: "This young male monkey was found with severe burns from high-voltage wires near Mulund. After initial treatment at our facility, he was transferred to a wildlife rehabilitation center where he learned natural foraging skills with other monkeys. After six months, he was released in the Sanjay Gandhi National Park with his new troop.",
      location: "Mulund"
    },
    {
      id: 6,
      title: "Orphaned Baby Monkey Saved",
      animal: "Monkey",
      date: "June 8, 2023",
      image: "/images/monkeyRescue-2.jpg",
      excerpt: "A newborn monkey rescued after his mother was hit by a vehicle.",
      fullStory: "A security guard near Bhandup spotted a dead female monkey on the roadside with a tiny baby still clinging to her. Our team bottle-fed the infant every 2 hours for weeks. When old enough, he was introduced to a surrogate mother at a primate sanctuary where he's learning normal monkey behaviors.",
      location: "Bhandup"
    },

    // Cows
    {
      id: 7,
      title: "The Roadside Calf Who Became a Star",
      animal: "Cow",
      date: "November 22, 2022",
      image: "/images/cowRescue-1.webp",
      excerpt: "Rescued from illegal transport at just 3 days old, Gauri is now the mascot of our sanctuary.",
      fullStory: "We intercepted an overloaded truck carrying young calves illegally. Little Gauri was the weakest of the group, unable to stand. Our team bottle-fed her every 2 hours for weeks. As she grew stronger, her playful personality emerged. Today she's the first to greet visitors at our sanctuary and has helped change perceptions about farm animal intelligence and emotions.",
      location: "Pokhran Road"
    },
    {
      id: 8,
      title: "Injured Bullock Finds Sanctuary",
      animal: "Cow",
      date: "February 14, 2023",
      image: "/images/cowRescue-2.jpg",
      excerpt: "Severely overworked and injured, this bullock now enjoys peaceful retirement.",
      fullStory: "Found collapsed on Airoli road with multiple injuries from an ill-fitting yoke, this bullock was in critical condition. After months of medical treatment and physical therapy, he regained his strength but was deemed unfit for work. He now lives at our sanctuary where he enjoys daily brushing and special treats from visitors.",
      location: "Airoli"
    },

    // Donkeys
    {
      id: 9,
      title: "Donkey Rescued from Brick Kiln",
      animal: "Donkey",
      date: "May 5, 2023",
      image: "/images/donkeyRescue-1.jpg",
      excerpt: "Severely malnourished and overworked, this donkey is learning to trust again.",
      fullStory: "Working with local authorities, we confiscated four donkeys from an illegal brick kiln operation. One was in particularly bad shape, with open sores from ill-fitting harnesses and extreme malnutrition. After six months of specialized care, he's regained a healthy weight and enjoys daily walks with his new donkey friends at our sanctuary.",
      location: "Rabale"
    },
    {
      id: 10,
      title: "Injured Sparrow Returns to the Sky",
      animal: "Bird",
      date: "July 29, 2023",
      image: "/images/sparrow-1.webp",
      excerpt: "A black Sparrow with a fractured wing was treated and successfully released.",
      fullStory: "Locals found the bird grounded near a landfill in Kalyan. X-rays confirmed a wing fracture. With surgical care and weeks of flight therapy, the sparrow eventually regained strength and was released at dawn near a forest edge. Watching it soar again was unforgettable.",
      location: "Kalyan"
    }
  ];

  // Slider functionality
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredStories.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredStories.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate a random rescue story based on animal type
  const generateRandomRescue = (animalType) => {
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomDate = new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const animalNames = {
      Dog: ["Max", "Buddy", "Rocky", "Charlie", "Jack", "Cooper", "Toby", "Duke"],
      Cat: ["Luna", "Bella", "Lucy", "Lily", "Milo", "Oliver", "Leo", "Simba"],
      Monkey: ["Manoj", "Bandar", "Gippy", "Cheeku", "Babloo"],
      Cow: ["Gauri", "Lakshmi", "Kamadhenu", "Nandini", "Radha", "Ganga"],
      Donkey: ["Gadha", "Lalu", "Chotu", "Bholu", "Ramu"],
      Bird: ["Mitthu", "Chirpy", "Tweety", "Sky", "Feather", "Coco", "Kiwi"]
    };

    const name = animalNames[animalType][Math.floor(Math.random() * animalNames[animalType].length)];
    const conditions = {
      Dog: ["broken leg", "severe mange", "malnourishment", "hit by vehicle", "tied to pole", "parvovirus"],
      Cat: ["eye infection", "burn wounds", "abandoned in box", "stuck in tree", "respiratory infection"],
      Monkey: ["electrocution burns", "hit by vehicle", "trapped in wire", "dehydration"],
      Cow: ["dehydrated", "injured leg", "separated from mother", "illegal transport", "yoke injuries"],
      Donkey: ["overwork injuries", "hoof problems", "malnutrition", "harness wounds"],
      Bird: ["fractured wing", "caught in net", "illegal cage trade", "heatstroke", "dehydration"]
    };

    const condition = conditions[animalType][Math.floor(Math.random() * conditions[animalType].length)];

    return {
      name,
      condition,
      location: randomLocation,
      date: randomDate,
      story: `Our team was alerted about a ${animalType.toLowerCase()} in distress near ${randomLocation}. When we arrived, we found ${name} suffering from ${condition}. After ${Math.floor(Math.random() * 5) + 1} days of treatment and care, ${name} made a full recovery and was ${Math.random() > 0.3 ? 'adopted by a loving family' : 'released back to a safe location'}.`
    };
  };

  const featuredStories = stories
    .filter(story => [1, 3, 5, 7, 9].includes(story.id))
    .map(story => ({
      ...story,
      randomRescue: generateRandomRescue(story.animal)
    }));

  const handleStoryClick = (story) => {
    setSelectedStory({
      ...story,
      randomRescue: generateRandomRescue(story.animal)
    });
    setView('single');
  };

  const closeStory = () => {
    setView('grid');
    setSelectedStory(null);
  };

  if (view === 'single' && selectedStory) {
    return (
      <div className="font-sans bg-gradient-to-b from-[#F5F0FF] to-[#F0F5FF] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.button 
            onClick={closeStory}
            className="flex items-center text-[#A294F9] hover:text-[#8A7BD8] mb-8 transition group"
            whileHover={{ x: -5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="rotate-180 mr-2 transition-transform duration-300 group-hover:-translate-x-1" 
            />
            Back to all stories
          </motion.button>

          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#F0F0F0]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-96 overflow-hidden">
              <motion.img 
                src={selectedStory.image} 
                alt={selectedStory.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <motion.span 
                  className={`flex items-center px-3 py-1 rounded-full ${
                    selectedStory.animal === 'Dog' ? 'bg-[#FFEEF2] text-[#FF7E5F]' :
                    selectedStory.animal === 'Cat' ? 'bg-[#E5F9FF] text-[#4ECDC4]' :
                    selectedStory.animal === 'Monkey' ? 'bg-[#FFF5E5] text-[#FFB347]' :
                    'bg-[#F5EFFF] text-[#A294F9]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <FontAwesomeIcon icon={faPaw} className="mr-2" />
                  {selectedStory.animal}
                </motion.span>
                
                <motion.span 
                  className="flex items-center px-3 py-1 rounded-full bg-[#F5F5F5] text-gray-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  {selectedStory.date}
                </motion.span>
                
                <motion.span 
                  className="flex items-center px-3 py-1 rounded-full bg-[#F5F5F5] text-gray-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {selectedStory.location}
                </motion.span>
              </div>
              
              <motion.h1 
                className="text-3xl font-bold text-[#5E4FA2] mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {selectedStory.title}
              </motion.h1>
              
              <div className="prose max-w-none text-gray-700 mb-8">
                <motion.p 
                  className="text-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedStory.fullStory}
                </motion.p>
                
                <motion.div 
                  className={`p-6 rounded-lg mb-8 ${
                    selectedStory.animal === 'Dog' ? 'bg-[#FFEEF2] border border-[#FFE5E5]' :
                    selectedStory.animal === 'Cat' ? 'bg-[#E5F9FF] border border-[#E0F7FF]' :
                    selectedStory.animal === 'Monkey' ? 'bg-[#FFF5E5] border border-[#FFEEDD]' :
                    'bg-[#F5EFFF] border border-[#E5D9F2]'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold text-[#5E4FA2] mb-4">Rescue Details</h3>
                  <p>
                    <strong>Location:</strong> {selectedStory.randomRescue.location}<br />
                    <strong>Date Found:</strong> {selectedStory.randomRescue.date}<br />
                    <strong>Condition:</strong> {selectedStory.randomRescue.condition}
                  </p>
                </motion.div>
                
                <motion.p 
                  className="text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {selectedStory.randomRescue.story}
                </motion.p>
              </div>
              
              <motion.div 
                className="border-t border-[#E5D9F2] pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-[#A294F9] font-medium">This rescue was made possible by donors like you</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar/>
      <div className="font-sans bg-gradient-to-b from-[#F5F0FF] to-[#F0F5FF] overflow-hidden">
        {/* Hero Section */}
        <motion.div 
          className="relative h-96 flex items-center justify-center text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(94, 79, 162, 0.85), rgba(94, 79, 162, 0.85)), url('/images/rescue-hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-white px-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rescue Stories</h1>
            <p className="text-xl md:text-2xl">Every life saved has a story worth telling</p>
          </motion.div>
        </motion.div>

        {/* Featured Stories Carousel */}
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-center text-[#5E4FA2] mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Featured Rescues
            </motion.h2>
            
            <div className="relative h-96">
              {featuredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                >
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row h-full w-full max-w-4xl border border-[#F0F0F0]">
                    <div className="md:w-1/2 h-64 md:h-full">
                      <motion.img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-center">
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-full mr-3 ${
                          story.animal === 'Dog' ? 'bg-[#FFEEF2] text-[#FF7E5F]' :
                          story.animal === 'Cat' ? 'bg-[#E5F9FF] text-[#4ECDC4]' :
                          story.animal === 'Monkey' ? 'bg-[#FFF5E5] text-[#FFB347]' :
                          'bg-[#F5EFFF] text-[#A294F9]'
                        }`}>
                          <FontAwesomeIcon icon={faPaw} />
                        </div>
                        <span className="text-[#5E4FA2]">{story.animal}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#5E4FA2] mb-3">{story.title}</h3>
                      <p className="text-gray-700 mb-5">{story.excerpt}</p>
                      <motion.button
                        onClick={() => handleStoryClick(story)}
                        className="flex items-center text-[#A294F9] font-semibold hover:text-[#8A7BD8] transition self-start group"
                        whileHover={{ x: 5 }}
                      >
                        Read full story 
                        <motion.span 
                          className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <FontAwesomeIcon icon={faArrowRight} />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full hover:bg-[#F5EFFF] transition ml-4 shadow-md border border-[#E5D9F2]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-[#5E4FA2]" />
              </motion.button>
              <motion.button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full hover:bg-[#F5EFFF] transition mr-4 shadow-md border border-[#E5D9F2]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faArrowRight} className="text-[#5E4FA2]" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Rescue Heroes Section */}
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-center text-[#5E4FA2] mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Meet Our Rescue Heroes
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Veterinarian Card */}
              <motion.div 
                className="bg-gradient-to-br from-[#FFEEF2] to-[#FFF5EE] p-8 rounded-xl text-center border border-[#FFE5E5]"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(255, 126, 95, 0.1)" }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-[#FF7E5F] to-[#FFB347] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-md"
                  animate={pulseAnimation}
                >
                  <FontAwesomeIcon icon={faUser} className="text-3xl text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Nisha Pawar</h3>
                <p className="text-[#FF7E5F] mb-2">Lead Veterinarian</p>
                <p className="text-gray-700">
                  "Every animal deserves compassionate care. I've treated over 1,200 rescues and each recovery story fuels my passion."
                </p>
              </motion.div>

              {/* Night Team Card */}
              <motion.div 
                className="bg-gradient-to-br from-[#E5F9FF] to-[#F0F9FF] p-8 rounded-xl text-center border border-[#E0F7FF]"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(78, 205, 196, 0.1)" }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-[#4ECDC4] to-[#7FD1D1] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-md"
                  animate={pulseAnimation}
                >
                  <FontAwesomeIcon icon={faUsers} className="text-3xl text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">The Night Rescue Team</h3>
                <p className="text-[#4ECDC4] mb-2">Emergency Response Unit</p>
                <p className="text-gray-700">
                  "We patrol Thane's streets nightly, responding to distress calls and saving animals in critical condition."
                </p>
              </motion.div>

              {/* Foster Network Card */}
              <motion.div 
                className="bg-gradient-to-br from-[#F5EFFF] to-[#F0E5FF] p-8 rounded-xl text-center border border-[#E5D9F2]"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(162, 148, 249, 0.1)" }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-[#A294F9] to-[#C1B6FF] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-md"
                  animate={pulseAnimation}
                >
                  <FontAwesomeIcon icon={faHandsHelping} className="text-3xl text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Foster Care Network</h3>
                <p className="text-[#A294F9] mb-2">150+ Volunteer Families</p>
                <p className="text-gray-700">
                  "Our foster families provide temporary homes where animals heal physically and emotionally before adoption."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Rescue Process Section */}
        <div className="bg-gradient-to-br from-[#F5F0FF] to-[#F0F5FF] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-center text-[#5E4FA2] mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Rescue Process
            </motion.h2>
            
            <div className="relative">
              <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-[#FF7E5F] via-[#A294F9] to-[#4ECDC4]"></div>
              
              <motion.div 
                className="grid md:grid-cols-5 gap-8 relative z-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Emergency Call */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md text-center border border-[#FFEEEE]"
                  variants={fadeIn}
                  whileHover={{ y: -10, rotate: 1 }}
                >
                  <div className="bg-[#FFEEEE] text-[#FF7E5F] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5E4FA2] mb-2">1. Emergency Call</h3>
                  <p className="text-gray-700">24/7 hotline receives distress calls</p>
                </motion.div>

                {/* Rapid Response */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md text-center border border-[#E5F9FF]"
                  variants={fadeIn}
                  whileHover={{ y: -10, rotate: -1 }}
                >
                  <div className="bg-[#E5F9FF] text-[#4ECDC4] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <FontAwesomeIcon icon={faUser} className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5E4FA2] mb-2">2. Rapid Response</h3>
                  <p className="text-gray-700">Nearest team dispatched within 30 mins</p>
                </motion.div>

                {/* Medical Triage */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md text-center border border-[#FFF5E5]"
                  variants={fadeIn}
                  whileHover={{ y: -10, rotate: 1 }}
                >
                  <div className="bg-[#FFF5E5] text-[#FFB347] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <FontAwesomeIcon icon={faMedal} className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5E4FA2] mb-2">3. Medical Triage</h3>
                  <p className="text-gray-700">Immediate assessment by our vets</p>
                </motion.div>

                {/* Treatment Plan */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md text-center border border-[#FFEEF2]"
                  variants={fadeIn}
                  whileHover={{ y: -10, rotate: -1 }}
                >
                  <div className="bg-[#FFEEF2] text-[#FF7E5F] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5E4FA2] mb-2">4. Treatment Plan</h3>
                  <p className="text-gray-700">Customized care for each case</p>
                </motion.div>

                {/* Recovery & Rehome */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md text-center border border-[#F5EFFF]"
                  variants={fadeIn}
                  whileHover={{ y: -10, rotate: 1 }}
                >
                  <div className="bg-[#F5EFFF] text-[#A294F9] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <FontAwesomeIcon icon={faPaw} className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5E4FA2] mb-2">5. Recovery & Rehome</h3>
                  <p className="text-gray-700">Rehabilitation leading to adoption</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stories Grid Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2 
            className="text-3xl font-bold text-center text-[#5E4FA2] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Recent Rescues
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stories.map((story) => (
              <motion.div 
                key={story.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-[#F0F0F0]"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden">
                  <motion.img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-full mr-3 ${
                      story.animal === 'Dog' ? 'bg-[#FFEEF2] text-[#FF7E5F]' :
                      story.animal === 'Cat' ? 'bg-[#E5F9FF] text-[#4ECDC4]' :
                      story.animal === 'Monkey' ? 'bg-[#FFF5E5] text-[#FFB347]' :
                      'bg-[#F5EFFF] text-[#A294F9]'
                    }`}>
                      <FontAwesomeIcon icon={faPaw} />
                    </div>
                    <span className="font-medium text-[#5E4FA2]">{story.animal}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <div className="text-gray-500">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                      <span>{story.date}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#5E4FA2] mb-3">{story.title}</h3>
                  <p className="text-gray-700 mb-5">{story.excerpt}</p>
                  <motion.button 
                    onClick={() => handleStoryClick(story)}
                    className="flex items-center text-[#A294F9] font-semibold hover:text-[#8A7BD8] transition group"
                    whileHover={{ x: 5 }}
                  >
                    Read full story 
                    <motion.span 
                      className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-[#A294F9] to-[#7FD1D1] py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Be Part of the Next Rescue Story</h2>
            <p className="text-xl text-white/90 mb-8">
              Whether through donations, volunteering, or adoption - you can help write happy endings.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/donate">
                <motion.button 
                  className="bg-white text-[#5E4FA2] font-bold py-3 px-8 rounded-full transition duration-300 hover:bg-opacity-90"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  Donate to Support Rescues
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button 
                  className="bg-transparent border-2 border-white text-blue-800 font-bold py-3 px-8 rounded-full transition duration-300 hover:bg-white hover:bg-opacity-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Share Your Story
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer/>
    </>
  );
};

export default Rescue;