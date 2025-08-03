"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHandsHelping, 
  faHeart,
  faBullhorn,
  faMemory,
  faHandHoldingHeart,
  faUsers,
  faCalendarAlt,
  faUserGrow,
  faUsersRays
} from "@fortawesome/free-solid-svg-icons";
import { Handshake } from 'lucide-react';
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { supabase } from "@/utils/supabase";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Volunteer() {
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    mobile: "",
    address: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      const { data, error } = await supabase
        .from("volunteers")
        .insert([
          {
            full_name: formData.fullName,
            location: formData.location,
            mobile: formData.mobile,
            address: formData.address,
            email: formData.email,
          },
        ])
        .select();

      if (error) throw error;

      setSubmitStatus({
        success: true,
        message: "Thank you for your application! We'll contact you soon.",
      });

      // Reset form
      setFormData({
        fullName: "",
        location: "",
        mobile: "",
        address: "",
        email: "",
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to submit. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="font-sans bg-white">
        {/* Hero Section with Animation */}
        <motion.div 
          className="relative h-96 pt-13 flex items-center justify-center text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(94, 79, 162, 0.85), rgba(94, 79, 162, 0.85)), url('/images/rescue-hero.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-white px-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Become a Volunteer
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Join our mission to create a compassionate world for street
              animals. <br /> Your time and skills can make a real difference!
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content Section */}
        <motion.div 
          className="max-w-4xl mx-auto mt-5 grid md:grid-cols-2 gap-8 mb-12 bg-white px-4"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Why Volunteer Section */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <motion.h2 
              className="text-2xl font-bold text-[#A294F9] mb-6"
              whileInView={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Why Volunteer With Us?
            </motion.h2>

            <div className="space-y-4">
              {[
                { 
                  icon: faBullhorn, 
                  title: "Be a Voice for the Voiceless", 
                  text: "Advocate for animals and raise awareness in your community about their rights and needs.",
                  bg: "bg-[#FFE8E8]", 
                  color: "#FF6B6B" 
                },
                { 
                  icon: faMemory, 
                  title: "Create Lifelong Memories", 
                  text: "Every rescue and recovery story becomes a cherished memory you'll carry forever.",
                  bg: "bg-[#E5F9FF]", 
                  color: "#00C2FF" 
                },
                { 
                  icon: faHandHoldingHeart, 
                  title: "Make a Direct Impact", 
                  text: "See the immediate difference you make in animals' lives through rescue, care, and rehabilitation.",
                  bg: "bg-[#FFF2E5]", 
                  color: "#FF9F43" 
                },
                { 
                  icon: faUsersRays, 
                  title: "Learn New Skills", 
                  text: "Gain hands-on experience in animal care, first aid, and community outreach.",
                  bg: "bg-[#F0FFE5]", 
                  color: "#6BCB77" 
                },
                { 
                  icon: faUsers, 
                  title: "Join a Compassionate Community", 
                  text: "Connect with like-minded people who share your passion for animal welfare.",
                  bg: "bg-[#F5E5FF]", 
                  color: "#A459D1" 
                },
                { 
                  icon: faCalendarAlt, 
                  title: "Flexible Opportunities", 
                  text: "Choose from various roles that fit your schedule and interests - from field rescues to admin support.",
                  bg: "bg-[#E5ECFF]", 
                  color: "#4D96FF" 
                },
                { 
                  icon: faHeart, 
                  title: "Personal Growth", 
                  text: "Develop empathy, patience, and leadership skills while making a difference.",
                  bg: "bg-[#FFE5F1]", 
                  color: "#FF78C4" 
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className={`${item.bg} p-2 rounded-full mr-4`}
                    animate={pulseAnimation}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`text-[${item.color}]`}
                      style={{ color: item.color }}
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-[#5E4FA2]">{item.title}</h3>
                    <p className="text-sm text-[#5E4FA2]/90">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Volunteer Form */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <motion.h2 
              className="text-2xl font-bold text-[#A294F9] mb-6"
              whileInView={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Volunteer Application
            </motion.h2>

            {submitStatus.message && (
              <motion.div
                className={`p-4 mb-4 rounded-md ${
                  submitStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {[
                { id: "fullName", label: "Full Name", type: "text", required: true },
                { id: "location", label: "Location (City/Area)", type: "text", required: true },
                { id: "mobile", label: "Mobile Number", type: "tel", required: true },
                { id: "email", label: "Email ID", type: "email", required: false },
                { id: "address", label: "Address", type: "textarea", required: false }
              ].map((field, index) => (
                <motion.div key={field.id} variants={fadeIn}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <motion.textarea
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                      whileFocus={{ scale: 1.01 }}
                    />
                  ) : (
                    <motion.input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                      whileFocus={{ scale: 1.01 }}
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#A294F9] text-white py-3 px-4 rounded-md hover:bg-[#8A7BD8] transition flex items-center justify-center font-medium disabled:opacity-50 gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={fadeIn}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
                {!isSubmitting && <Handshake className="w-5 h-5" />}
                {isSubmitting && (
                  <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FontAwesomeIcon icon={faHandsHelping} />
                  </motion.span>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}