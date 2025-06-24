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
      <div className="font-sans bg-[#F5EFFF] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <button 
            onClick={closeStory}
            className="flex items-center text-[#A294F9] hover:text-[#8A7BD8] mb-8 transition"
          >
            <FontAwesomeIcon icon={faArrowRight} className="rotate-180 mr-2" />
            Back to all stories
          </button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 overflow-hidden">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex flex-wrap items-center text-[#A294F9] mb-4 gap-4">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faPaw} className="mr-2" />
                  {selectedStory.animal}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  {selectedStory.date}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {selectedStory.location}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-[#5E4FA2] mb-6">{selectedStory.title}</h1>
              
              <div className="prose max-w-none text-gray-700 mb-8">
                <p className="text-lg mb-6">{selectedStory.fullStory}</p>
                
                <div className="bg-[#F5EFFF] p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold text-[#5E4FA2] mb-4">Rescue Details</h3>
                  <p>
                    <strong>Location:</strong> {selectedStory.randomRescue.location}<br />
                    <strong>Date Found:</strong> {selectedStory.randomRescue.date}<br />
                    <strong>Condition:</strong> {selectedStory.randomRescue.condition}
                  </p>
                </div>
                
                <p className="text-lg">{selectedStory.randomRescue.story}</p>
              </div>
              
              <div className="border-t border-[#E5D9F2] pt-6">
                <p className="text-[#A294F9] font-medium">This rescue was made possible by donors like you</p>
           
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="font-sans bg-[#F5EFFF]">
      {/* Hero Section */}
      <div 
        className="relative h-96 flex items-center justify-center text-center bg-[#A294F9]"
        style={{
          backgroundImage: "linear-gradient(rgba(165, 148, 249, 0.85), rgba(165, 148, 249, 0.85)), url('/images/rescue-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rescue Stories</h1>
          <p className="text-xl md:text-2xl">Every life saved has a story worth telling</p>
        </div>
      </div>
<div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#5E4FA2] mb-12">Meet Our Rescue Heroes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F5EFFF] p-8 rounded-xl text-center">
              <div className="bg-[#A294F9] text-white w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faUser} className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Nisha Pawar</h3>
              <p className="text-gray-600 mb-2">Lead Veterinarian</p>
              <p className="text-gray-700">
                "Every animal deserves compassionate care. I've treated over 1,200 rescues and each recovery story fuels my passion."
              </p>
            </div>

            <div className="bg-[#F5EFFF] p-8 rounded-xl text-center">
              <div className="bg-[#A294F9] text-white w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">The Night Rescue Team</h3>
              <p className="text-gray-600 mb-2">Emergency Response Unit</p>
              <p className="text-gray-700">
                "We patrol Thane's streets nightly, responding to distress calls and saving animals in critical condition."
              </p>
            </div>

            <div className="bg-[#F5EFFF] p-8 rounded-xl text-center">
              <div className="bg-[#A294F9] text-white w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faHandsHelping} className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Foster Care Network</h3>
              <p className="text-gray-600 mb-2">150+ Volunteer Families</p>
              <p className="text-gray-700">
                "Our foster families provide temporary homes where animals heal physically and emotionally before adoption."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rescue Process Infographic */}
      <div className="bg-[#E5D9F2] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#5E4FA2] mb-12">Our Rescue Process</h2>
          
          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-[#A294F9]"></div>
            
            <div className="grid md:grid-cols-5 gap-8 relative z-10">
              {[
                { icon: faClipboardList, title: "1. Emergency Call", text: "24/7 hotline receives distress calls" },
                { icon: faUser, title: "2. Rapid Response", text: "Nearest team dispatched within 30 mins" },
                { icon: faMedal, title: "3. Medical Triage", text: "Immediate assessment by our vets" },
                { icon: faHeart, title: "4. Treatment Plan", text: "Customized care for each case" },
                { icon: faPaw, title: "5. Recovery & Rehome", text: "Rehabilitation leading to adoption" }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="bg-[#A294F9] text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={step.icon} className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5E4FA2] mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#5E4FA2] mb-12">Community Impact</h2>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[#5E4FA2] mb-4">Educating Future Generations</h3>
              <p className="text-gray-700 mb-6">
                We've conducted 85+ workshops in Thane schools, teaching 3,200+ children about animal welfare, responsible pet ownership, and compassion toward all living beings.
              </p>
              <div className="bg-[#F5EFFF] p-6 rounded-lg">
                <p className="font-semibold text-[#5E4FA2]">"My students now organize donation drives and want to become veterinarians!"</p>
                <p className="text-gray-600">- Mrs. Desai, School Principal</p>
              </div>
            </div>
            
            <div className="bg-[#F5EFFF] p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-4">By The Numbers</h3>
              <ul className="space-y-4">
                {[
                  { stat: "2,500+", label: "Animals rescued since 2021" },
                  { stat: "1,800+", label: "Successful sterilizations" },
                  { stat: "92%", label: "Rescue success rate" },
                  { stat: "150+", label: "Active volunteers" },
                  { stat: "50+", label: "Community partnerships" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="bg-[#A294F9] w-3 h-3 rounded-full mr-3"></div>
                    <span className="font-bold text-[#5E4FA2] mr-2">{item.stat}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* Stories Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[#5E4FA2] mb-12">Recent Rescues</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-[#A294F9] mb-3">
                  <FontAwesomeIcon icon={faPaw} className="mr-2" />
                  <span className="font-medium">{story.animal}</span>
                  <span className="mx-2">•</span>
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  <span>{story.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#5E4FA2] mb-3">{story.title}</h3>
                <p className="text-gray-700 mb-5">{story.excerpt}</p>
                <button 
                  onClick={() => handleStoryClick(story)}
                  className="flex items-center text-[#A294F9] font-semibold hover:text-[#8A7BD8] transition"
                >
                  Read full story <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How You Helped Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#5E4FA2] mb-4">How Your Support Makes a Difference</h2>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Every donation and volunteer hour directly contributes to stories like these
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-[#F5EFFF] p-8 rounded-xl">
              <div className="text-5xl font-bold text-[#A294F9] mb-4">1</div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Rescue</h3>
              <p className="text-gray-700">
                Your support funds emergency rescues, medical kits, and our 24/7 rescue hotline.
              </p>
            </div>
            <div className="bg-[#F5EFFF] p-8 rounded-xl">
              <div className="text-5xl font-bold text-[#A294F9] mb-4">2</div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Recover</h3>
              <p className="text-gray-700">
                Donations provide medical care, surgeries, and rehabilitation facilities.
              </p>
            </div>
            <div className="bg-[#F5EFFF] p-8 rounded-xl">
              <div className="text-5xl font-bold text-[#A294F9] mb-4">3</div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Rehome</h3>
              <p className="text-gray-700">
                Your contributions support adoption events, foster networks, and home checks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#CDC1FF] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#5E4FA2] mb-6">Be Part of the Next Rescue Story</h2>
          <p className="text-xl text-gray-700 mb-8">
            Whether through donations, volunteering, or adoption - you can help write happy endings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="donate">
            <button className="bg-[#5E4FA2] hover:bg-[#4D3D8F] text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Donate to Support Rescues
            </button>
            </Link>
            <Link href="/contact">
            <button className="bg-white text-[#5E4FA2] border-2 border-[#5E4FA2] hover:bg-[#F5EFFF] font-bold py-3 px-8 rounded-full transition duration-300">
              Share Your Story
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Rescue;