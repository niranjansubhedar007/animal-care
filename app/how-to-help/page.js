
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faPaw,
  faUserFriends,
  faDonate,
  faShareAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
export default function HowToHelp() {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
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

  const waysToHelp = [
    {
      title: "Volunteer Your Time",
      icon: faUserFriends,
      description: "Join our team of dedicated volunteers who help with animal care, rescue operations, and daily shelter activities.",
      actions: [
        "Help with feeding and cleaning",
        "Assist in animal rescues",
        "Participate in adoption events",
        "Provide foster care"
      ],
      color: "from-[#FFEEF2] to-[#FFF5EE]",
      iconColor: "bg-gradient-to-br from-[#FF7E5F] to-[#FFB347]"
    },
    {
      title: "Make a Donation",
      icon: faDonate,
      description: "Financial contributions help us provide medical care, food, and shelter for animals in need.",
      actions: [
        "One-time donations",
        "Monthly sponsorship",
        "Sponsor a specific animal",
        "Donate supplies (food, blankets, etc.)"
      ],
      color: "from-[#E5F9FF] to-[#F0F9FF]",
      iconColor: "bg-gradient-to-br from-[#4ECDC4] to-[#7FD1D1]"
    },
    {
      title: "Adopt, Don't Shop",
      icon: faPaw,
      description: "Give a loving home to rescued animals and make space for us to help more animals.",
      actions: [
        "Browse our adoptable animals",
        "Learn about adoption process",
        "Prepare your home for a pet",
        "Post-adoption support"
      ],
      color: "from-[#F5EFFF] to-[#F0E5FF]",
      iconColor: "bg-gradient-to-br from-[#A294F9] to-[#C1B6FF]"
    },
    {
      title: "Spread Awareness",
      icon: faShareAlt,
      description: "Help us educate others about animal welfare and responsible pet ownership.",
      actions: [
        "Share our social media posts",
        "Tell friends about our work",
        "Organize awareness events",
        "Distribute educational materials"
      ],
      color: "from-[#FFF0F5] to-[#FFFAF0]",
      iconColor: "bg-gradient-to-br from-[#FF6B88] to-[#FF8E53]"
    },
    {
      title: "Attend Events",
      icon: faCalendarAlt,
      description: "Participate in our fundraising and awareness events to support our cause.",
      actions: [
        "Adoption drives",
        "Fundraising galas",
        "Educational workshops",
        "Community clean-ups"
      ],
      color: "from-[#F0F9FF] to-[#E6F9FF]",
      iconColor: "bg-gradient-to-br from-[#3AA8D0] to-[#5EC4E8]"
    },
    {
      title: "Corporate Partnerships",
      icon: faHandHoldingHeart,
      description: "Businesses can support us through sponsorships, employee volunteering, and donation matching.",
      actions: [
        "Sponsor an event or program",
        "Organize workplace giving",
        "Product donations",
        "CSR initiatives"
      ],
      color: "from-[#F5F0FF] to-[#F0F5FF]",
      iconColor: "bg-gradient-to-br from-[#8A7BD8] to-[#A294F9]"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#F5F0FF] to-[#F0F5FF]">
        {/* Hero Section */}
        <motion.div 
          className="relative h-96 pt-13 flex items-center justify-center text-center"
          style={{
            backgroundImage: "linear-gradient(rgba(94, 79, 162, 0.85), rgba(94, 79, 162, 0.85)), url('/images/help-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How You Can Help
            </h1>
            <p className="text-xl md:text-2xl">
              Every action counts in our mission to protect and care for animals
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#5E4FA2] mb-4">
              Many Ways to Make a Difference
            </h2>
            <p className="text-lg text-[#5E4FA2]/90 max-w-3xl mx-auto">
              Whether you have time, resources, or skills to share, there are numerous
              ways you can contribute to our cause and help animals in need.
            </p>
          </motion.div>

          {/* Ways to Help Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {waysToHelp.map((way, index) => (
              <motion.div
                key={index}
                className={`bg-white  ${way.color} rounded-lg shadow-md p-6 hover:shadow-lg transition border border-white`}
                variants={fadeIn}
                whileHover={{ y: -5, rotate: index % 2 === 0 ? 1 : -1 }}
              >
                <motion.div 
                  className={`${way.iconColor} text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-md`}
                  animate={pulseAnimation}
                >
                  <FontAwesomeIcon icon={way.icon} className="text-2xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-[#5E4FA2] mb-3">
                  {way.title}
                </h3>
                <p className="text-[#5E4FA2]/90 mb-4">{way.description}</p>
                <ul className="space-y-2">
                  {way.actions.map((action, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-[#A294F9] mr-2">•</span>
                      <span className="text-[#5E4FA2]">{action}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="bg-gradient-to-r from-[#A294F9] to-[#7FD1D1] rounded-lg p-8 text-center shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join our community of animal lovers and be part of the change you
              want to see in the world.
            </p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/volunteer">
                <motion.button 
                  className="bg-white text-[#5E4FA2] px-6 py-3 rounded-md hover:bg-opacity-90 transition font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Volunteer Now
                </motion.button>
              </Link>
       
              <Link href="/contact">
                <motion.button 
                  className="bg-[#5E4FA2] text-white px-6 py-3 rounded-md hover:bg-[#4D4396] transition font-medium border-2 border-[#5E4FA2]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}