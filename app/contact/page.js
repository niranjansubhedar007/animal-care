"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { supabase } from "@/utils/supabase";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      setSubmitStatus({
        success: true,
        message: "Thank you for your message! We'll contact you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: "There was an error submitting your form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5EFFF]">
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
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              We'd love to hear from you! Reach out for inquiries, support, or to
              get involved.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-12"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={fadeIn}>
              <motion.h2 
                className="text-3xl font-bold text-[#5E4FA2] mb-6"
                whileInView={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Get in Touch
              </motion.h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <div className="bg-[#FFEEEE] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-[#EF476F] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Our Address
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      9 Shastri Nagar, Near Yashodhan School
                      <br />
                      Thane, Maharashtra 400606
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="bg-[#E5F9FF] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-[#118AB2] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Phone Number
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      +91 9136263344
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-[#FFF2E5] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-[#FF9F43] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Email Address
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      info@hopeanimalcare.in
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="bg-[#F0FFE5] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-[#6BCB77] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Shelter Hours
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      Monday to Saturday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-[#5E4FA2]/90">Sunday: Closed</p>
                  </div>
                </div>
                {/* Social Media */}
                <motion.div 
                  className="pt-4"
                  variants={fadeIn}
                >
                  <h3 className="text-lg font-bold text-[#5E4FA2] mb-3">
                    Connect With Us
                  </h3>
                  <motion.div 
                    className="flex space-x-4"
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {[
                      {
                        href: "https://www.facebook.com/hopeanimalcare/",
                        icon: (
                          <svg className="w-5 h-5 text-[#5E4FA2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        )
                      },
                      {
                        href: "https://www.instagram.com/hopeanimalcarein/",
                        icon: (
                          <svg className="w-5 h-5 text-[#5E4FA2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        )
                      },
                      {
                        href: "https://www.youtube.com/channel/UC9vVr-l1KtK4P24ILu5hy3A",
                        icon: (
                          <svg className="w-5 h-5 text-[#5E4FA2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        )
                      }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#E5D9F2] hover:bg-[#CDC1FF] w-10 h-10 rounded-full flex items-center justify-center transition"
                        variants={fadeIn}
                        whileHover={{ scale: 1.1, y: -3 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <motion.h2 
                className="text-3xl font-bold text-[#5E4FA2] mb-6"
                whileInView={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Send Us a Message
              </motion.h2>

              {submitStatus.message && (
                <motion.div
                  className={`mb-6 p-4 rounded-md ${
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
    { id: "name", label: "Your Name", type: "text", required: true },
    { id: "email", label: "Email Address", type: "email", required: false },
    { id: "phone", label: "Phone Number", type: "tel", required: true },
    { id: "subject", label: "Subject", type: "select", required: true, options: [
        { value: "", label: "Select a subject" },
        { value: "Adoption", label: "Adoption Inquiry" },
        { value: "Volunteer", label: "Volunteer Opportunity" },
        { value: "Donation", label: "Donation Question" },
        { value: "Other", label: "Other" }
      ]
    },
    { id: "message", label: "Your Message", type: "textarea", required: false }
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
          rows="5"
          required={field.required}
          className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
          whileFocus={{ scale: 1.01 }}
        />
      ) : field.type === "select" ? (
        <motion.select
          id={field.id}
          name={field.id}
          value={formData[field.id]}
          onChange={handleChange}
          required={field.required}
          className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
          whileFocus={{ scale: 1.01 }}
        >
          {field.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
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
    className="bg-[#A294F9] text-white py-3 px-6 rounded-md hover:bg-[#8A7BD8] transition font-medium disabled:opacity-50 w-full"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    variants={fadeIn}
  >
    {isSubmitting ? (
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        Sending...
      </motion.span>
    ) : (
      "Send Message"
    )}
  </motion.button>
</motion.form>
            </motion.div>
          </div>

          {/* Map Section */}
        <motion.div 
  className="mt-16 bg-white rounded-lg shadow-md overflow-hidden"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <div className="p-4 bg-[#A294F9]">
    <h3 className="text-xl font-bold text-white">Our Shelter Location</h3>
  </div>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.222239381036!2d72.9526694!3d19.2136347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b99419b3d9c3%3A0x64ab1ba5ab83aa53!2sHOPE%20ANIMALS%20WELFARE%20FOUNDATION%20AND%20SHELTER!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full"
    title="Hope Animals Welfare Foundation Location"
  ></iframe>
  <div className="p-4 bg-gray-50">
    <p className="text-[#5E4FA2] font-medium">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#EF476F] mr-2" />
      Address: 9 Shastri Nagar, Near Yashodhan School, Thane, Maharashtra 400606
    </p>
    <p className="text-[#5E4FA2] mt-2">
      <FontAwesomeIcon icon={faClock} className="text-[#EF476F] mr-2" />
      Visiting Hours: Monday to Saturday: 9:00 AM - 6:00 PM

Sunday: Closed
    </p>
  </div>
</motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}