"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingMedical, faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../navbar/page';
import Footer from '../footer/page';
import Link from 'next/link';

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="font-sans">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-[#A294F9] flex items-center justify-center text-center"
        style={{
          backgroundImage: "linear-gradient(rgba(165, 148, 249, 0.8), rgba(165, 148, 249, 0.8)), url('/images/about-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Hope Animals Welfare Foundation</h1>
          <p className="text-xl md:text-2xl">Compassionate care for street animals since 2021</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="/images/np-4.jpg" 
              alt="Founder Nisha Pawar with rescued animal"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 bg-white">
            <h2 className="text-3xl font-bold text-[#5E4FA2] mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2021 in Thane, India by Nisha Pawar, Hope Animals Welfare Foundation emerged from a simple yet powerful vision - to create a compassionate world where no street animal suffers needlessly.
            </p>
            <p className="text-lg text-gray-700">
              What began as one woman's mission to help injured strays in her neighborhood has grown into a dedicated movement, providing medical care, shelter, and advocacy for hundreds of animals each year.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-[#F5EFFF] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#5E4FA2] mb-12">Our Mission & Vision</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-[#A294F9] mb-4 flex items-center">
                <FontAwesomeIcon icon={faHeart} className="mr-3" />
                Our Mission
              </h3>
              <p className="text-gray-700">
                To provide humane, sustainable solutions for street animals through rescue operations, medical treatment, sterilization programs, and community education. We believe every animal deserves protection and compassion.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-[#A294F9] mb-4 flex items-center">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-3" />
                Our Vision
              </h3>
              <p className="text-gray-700">
                A world where animals and humans coexist harmoniously, where no animal suffers from neglect or cruelty, and where communities actively participate in creating safer environments for all creatures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#5E4FA2] mb-12">Our Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-[#E5D9F2] p-6 rounded-lg">
              <div className="text-4xl font-bold text-[#5E4FA2] mb-2">2,500+</div>
              <div className="text-gray-700">Animals Rescued</div>
            </div>
            <div className="bg-[#CDC1FF] p-6 rounded-lg">
              <div className="text-4xl font-bold text-[#5E4FA2] mb-2">1,800+</div>
              <div className="text-gray-700">Sterilizations</div>
            </div>
            <div className="bg-[#E5D9F2] p-6 rounded-lg">
              <div className="text-4xl font-bold text-[#5E4FA2] mb-2">50+</div>
              <div className="text-gray-700">Community Programs</div>
            </div>
            <div className="bg-[#CDC1FF] p-6 rounded-lg">
              <div className="text-4xl font-bold text-[#5E4FA2] mb-2">100+</div>
              <div className="text-gray-700">Volunteers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[#F5EFFF] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#5E4FA2] mb-12">Our Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#A294F9] text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faHeart} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Compassion</h3>
              <p className="text-gray-700">
                We treat every animal with the kindness and respect they deserve, recognizing their inherent worth.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#A294F9] text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faHandHoldingMedical} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Commitment</h3>
              <p className="text-gray-700">
                We persist in our mission despite challenges, dedicated to creating lasting change.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#A294F9] text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">Community</h3>
              <p className="text-gray-700">
                We believe in working together with locals to build sustainable solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#5E4FA2] mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-700 mb-8">
            Every contribution helps us save more lives. Together, we can create a kinder world for animals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/donate">
            <button className="bg-[#A294F9] hover:bg-[#8A7BD8] text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Donate Now
            </button>
            </Link>
          <Link href="/volunteer">

            <button className="bg-white border-2 border-[#A294F9] text-[#5E4FA2] hover:bg-[#F5EFFF] font-bold py-3 px-8 rounded-full transition duration-300">
              Volunteer
            </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;