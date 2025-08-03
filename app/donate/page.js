"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faHandHoldingHeart, faShieldAlt, 
  faChartLine, faReceipt, faRupeeSign, faQuoteLeft,
  faArrowLeft, faArrowRight, faMapMarkerAlt, faClock
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../navbar/page';
import Footer from '../footer/page';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { supabase } from '@/utils/supabase';

const Donate = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Fetch testimonials from Supabase
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('donate')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  };

  const bounceAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Slider functionality
  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getCurrentTestimonials = () => {
    if (testimonials.length === 0) return [];
    const start = activeTestimonial;
    const end = Math.min(start + 3, testimonials.length);
    return testimonials.slice(start, end);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeTestimonial, testimonials.length]);

  return (
    <>
      <Navbar />
      <div className="font-sans bg-gradient-to-b from-[#F5EFFF] to-white min-h-screen">
        {/* Hero Section */}
        <motion.div 
          className="relative h-96 pt-13 flex items-center justify-center text-center"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h1>
            <p className="text-xl md:text-2xl">Your donation saves lives and creates lasting change</p>
          </motion.div>
        </motion.div>

        {/* Donation Content */}
        <motion.div 
          className="max-w-6xl mx-auto px-6 py-16"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Donation Options */}
            <motion.div 
              className="lg:w-1/2"
              variants={fadeIn}
            >
              <motion.h2 
                className="text-3xl font-bold text-[#5E4FA2] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ways to Donate
              </motion.h2>
              
              {/* QR Code Donation */}
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg mb-8 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
                variants={fadeIn}
              >
                <h3 className="text-2xl font-semibold text-[#5E4FA2] mb-4 flex items-center">
                  <motion.div 
                    className="bg-[#E5D9F2] p-3 rounded-full mr-3"
                    animate={pulseAnimation}
                  >
                    <FontAwesomeIcon icon={faRupeeSign} className="text-[#5E4FA2] text-xl" />
                  </motion.div>
                  Scan to Donate
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <img 
                      src="/images/qr-code.jpg" 
                      alt="Donation QR Code" 
                      width={500}
                      height={550}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Bank Transfer */}
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
                variants={fadeIn}
              >
                <h3 className="text-2xl font-semibold text-[#5E4FA2] mb-4 flex items-center">
                  <motion.div 
                    className="bg-[#E5D9F2] p-3 rounded-full mr-3"
                    animate={pulseAnimation}
                  >
                    <FontAwesomeIcon icon={faReceipt} className="text-[#5E4FA2] text-xl" />
                  </motion.div>
                  Bank Transfer
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Account Name</p>
                    <p className="text-gray-800 font-medium">Hope Animals Welfare Foundation</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Bank Name</p>
                    <p className="text-gray-800 font-medium">Axis Bank</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Account Number</p>
                    <p className="text-gray-800 font-medium">922020004487790</p>
                  </div>
                  <div>
                    <p className="text-gray-600">IFSC Code</p>
                    <p className="text-gray-800 font-medium">UTIB0003055</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Why Donate Section */}
            <motion.div 
              className="lg:w-1/2"
              variants={fadeIn}
            >
              <motion.h2 
                className="text-3xl font-bold text-[#5E4FA2] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Why Your Donation Matters
              </motion.h2>
              
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
              >
                {[
                  {
                    icon: faHeart,
                    title: "Direct Impact",
                    text: "Every rupee goes directly to animal care - medical treatment, food, shelter, and rehabilitation. We maintain complete transparency in fund utilization.",
                    color: "#EF476F",
                    bg: "bg-[#FFEEEE]"
                  },
                  {
                    icon: faHandHoldingHeart,
                    title: "Proven Track Record",
                    text: "Since 2021, we've rescued over 2,500 animals with a 92% success rate. Your donation contributes to this life-saving work.",
                    color: "#118AB2",
                    bg: "bg-[#E5F9FF]"
                  },
                  {
                    icon: faShieldAlt,
                    title: "Sustainable Solutions",
                    text: "We don't just rescue - we implement long-term solutions like sterilization programs and community education to prevent future suffering.",
                    color: "#06D6A0",
                    bg: "bg-[#E5FFF5]"
                  },
                  {
                    icon: faChartLine,
                    title: "Tax Benefits",
                    text: "All donations are eligible for 80G tax exemption under Indian tax laws. We provide receipts for all contributions.",
                    color: "#A294F9",
                    bg: "bg-[#F5EFFF]"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`${item.bg} text-white p-3 rounded-full mr-4`}>
                      <FontAwesomeIcon icon={item.icon} className="text-xl" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#5E4FA2] mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Donation Impact */}
              <motion.div 
                className="bg-gradient-to-r from-[#E5D9F2] to-[#CDC1FF] p-8 rounded-xl mt-8 shadow-md"
                variants={fadeIn}
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-2xl font-semibold text-[#5E4FA2] mb-4">Your Donation's Impact</h3>
                <ul className="space-y-3 text-[#5E4FA2]">
                  {[
                    { amount: "₹500", impact: "Feeds 10 stray dogs for a week" },
                    { amount: "₹1,000", impact: "Covers vaccination for 5 animals" },
                    { amount: "₹2,500", impact: "Funds one sterilization surgery" },
                    { amount: "₹5,000", impact: "Provides emergency medical care" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-[#5E4FA2] w-2 h-2 rounded-full mt-2 mr-3"></div>
                      <span><strong>{item.amount}</strong> - {item.impact}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

     

        {/* Testimonial Slider */}
        {testimonials.length > 0 && (
          <div className="bg-gradient-to-r from-[#CDC1FF] to-[#A294F9] py-16">
            <div className="max-w-6xl mx-auto px-6">
              <motion.h2 
                className="text-3xl font-bold text-center text-white mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                What Our Donors Say
              </motion.h2>
              
              <div className="relative">
                {/* Testimonial Cards - Showing 3 at a time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {getCurrentTestimonials().map((testimonial, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <FontAwesomeIcon 
                        icon={faQuoteLeft} 
                        className="text-[#A294F9] text-3xl mb-4"
                      />
                      <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                      <div className="border-t border-[#E5D9F2] pt-4">
                        <p className="font-semibold text-[#5E4FA2]">{testimonial.name}</p>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                {testimonials.length > 3 && (
                  <>
                    <button 
                      onClick={prevTestimonial}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white text-[#A294F9] p-3 rounded-full shadow-lg hover:bg-[#F5EFFF] transition"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white text-[#A294F9] p-3 rounded-full shadow-lg hover:bg-[#F5EFFF] transition"
                    >
                      <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
                    </button>
                  </>
                )}
                
                {/* Dots Indicator */}
                {testimonials.length > 3 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index * 3)}
                        className={`h-3 w-3 rounded-full transition-all ${Math.floor(activeTestimonial/3) === index ? 'bg-white w-6' : 'bg-[#A294F9]'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

  
      </div>
      <Footer/>
    </>
  );
};

export default Donate;