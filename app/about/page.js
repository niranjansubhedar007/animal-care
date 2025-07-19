"use client";
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingMedical, faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../navbar/page';
import Footer from '../footer/page';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
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

  return (
    <>
      <Navbar/>
      <div className="font-sans overflow-hidden">
        {/* Hero Section */}
        <motion.div 
          className="relative h-96 bg-[#A294F9] flex items-center justify-center text-center"
          style={{
            backgroundImage: "linear-gradient(rgba(165, 148, 249, 0.8), rgba(165, 148, 249, 0.8)), url('/images/about-hero.jpg')",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Hope Animals Welfare Foundation</h1>
            <p className="text-xl md:text-2xl">Compassionate care for street animals since 2021</p>
          </motion.div>
        </motion.div>

        {/* Our Story Section */}
        <motion.div 
          className="max-w-6xl mx-auto px-6 py-16 bg-white"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              variants={fadeIn}
            >
              <motion.img 
                src="/images/np-4.jpg" 
                alt="Founder Nisha Pawar with rescued animal"
                className="rounded-lg shadow-xl w-full h-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2 bg-white"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-[#5E4FA2] mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2021 in Thane, India by Nisha Pawar, Hope Animals Welfare Foundation emerged from a simple yet powerful vision - to create a compassionate world where no street animal suffers needlessly.
              </p>
              <p className="text-lg text-gray-700">
                What began as one woman's mission to help injured strays in her neighborhood has grown into a dedicated movement, providing medical care, shelter, and advocacy for hundreds of animals each year.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mission Section */}
        <div className="bg-[#F5EFFF] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-center text-[#5E4FA2] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Mission & Vision
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-[#5E4FA2] mb-4 flex items-center">
                  <motion.div 
                    className="bg-[#FFEEEE] p-3 rounded-full mr-3"
                    animate={pulseAnimation}
                  >
                    <FontAwesomeIcon icon={faHeart} className="text-[#EF476F] text-xl" />
                  </motion.div>
                  Our Mission
                </h3>
                <p className="text-gray-700">
                  To provide humane, sustainable solutions for street animals through rescue operations, medical treatment, sterilization programs, and community education. We believe every animal deserves protection and compassion.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-[#5E4FA2] mb-4 flex items-center">
                  <motion.div 
                    className="bg-[#E5F9FF] p-3 rounded-full mr-3"
                    animate={pulseAnimation}
                  >
                    <FontAwesomeIcon icon={faShieldAlt} className="text-[#118AB2] text-xl" />
                  </motion.div>
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  A world where animals and humans coexist harmoniously, where no animal suffers from neglect or cruelty, and where communities actively participate in creating safer environments for all creatures.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

{/* Impact Section */}
<div className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <motion.h2 
      className="text-3xl font-bold text-center text-[#5E4FA2] mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      Our Impact
    </motion.h2>
    
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        { number: "2,500+", text: "Animals Rescued", bg: "bg-[#E5D9F2]" },
        { number: "1,800+", text: "Sterilizations", bg: "bg-[#CDC1FF]" },
        { number: "50+", text: "Community Programs", bg: "bg-[#E5D9F2]" },
        { number: "100+", text: "Volunteers", bg: "bg-[#CDC1FF]" }
      ].map((item, index) => (
        <motion.div 
          key={index}
          className={`${item.bg} p-6 rounded-lg hover:shadow-md transition-shadow duration-300`}
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="text-4xl font-bold text-[#5E4FA2] mb-2"
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -8, 0], // Gentle bounce
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {item.number}
          </motion.div>
          <div className="text-gray-700">{item.text}</div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</div>

        {/* Values Section */}
        <div className="bg-[#F5EFFF] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-center text-[#5E4FA2] mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 "
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: faHeart, title: "Compassion", text: "We treat every animal with the kindness and respect they deserve, recognizing their inherent worth.", color: "#EF476F", bg: "bg-[#FFEEEE]" },
                { icon: faHandHoldingMedical, title: "Commitment", text: "We persist in our mission despite challenges, dedicated to creating lasting change.", color: "#118AB2", bg: "bg-[#E5F9FF]" },
                { icon: faUsers, title: "Community", text: "We believe in working together with locals to build sustainable solutions.", color: "#FFB347", bg: "bg-orange-100" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="text-center border border-gray-300 p-6 bg-white rounded-xl transition-all duration-300 hover:shadow-md"
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className={`${item.bg} w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 10 }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-2xl" style={{ color: item.color }} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#5E4FA2] mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="py-16 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#5E4FA2] mb-6">Join Our Mission</h2>
            <p className="text-xl text-gray-700 mb-8">
              Every contribution helps us save more lives. Together, we can create a kinder world for animals.
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
                  className="bg-[#A294F9] hover:bg-[#8A7BD8] text-white font-bold py-3 px-8 rounded-full transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  Donate Now
                </motion.button>
              </Link>
              <Link href="/volunteer">
                <motion.button 
                  className="bg-white border-2 border-[#A294F9] text-[#5E4FA2] hover:bg-[#F5EFFF] font-bold py-3 px-8 rounded-full transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  Volunteer
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

export default About;