"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faPaw,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { supabase } from "@/utils/supabase";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimalRescue() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    urgency: "not urgent",
    animalImage: null,
    notes: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      animalImage: e.target.files[0],
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    let imageUrl = null;

    if (formData.animalImage) {
      const fileExt = formData.animalImage.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `animal-rescue/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('animal-rescue')
        .upload(filePath, formData.animalImage);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('animal-rescue')
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from('animal_rescue') // corrected table name
      .insert([
        {
          name: formData.name,
          number: formData.phone,
          email: formData.email,
          address: formData.address,
          rescue_required: true,
          urgency: formData.urgency,
          animal_url: imageUrl,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;

    setSubmitStatus({
      success: true,
      message: "Thank you for your rescue request! Our team will contact you soon.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      urgency: "not urgent",
      animalImage: null,
      notes: "",
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    setSubmitStatus({
      success: false,
      message: "There was an error submitting your request. Please try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};




  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5EFFF]">
        {/* Hero Section */}
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
              Animal Rescue
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Report an animal in need of rescue or emergency care
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
            {/* Rescue Information */}
            <motion.div variants={fadeIn}>
              <motion.h2 
                className="text-3xl font-bold text-[#5E4FA2] mb-6"
                whileInView={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Emergency Rescue
              </motion.h2>

              <div className="space-y-6">
                {/* Process */}
                <div className="flex items-start">
                  <div className="bg-[#FFEEEE] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faPaw}
                      className="text-[#EF476F] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Our Rescue Process
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      1. Submit this form with details about the animal<br />
                      2. Our team will review and contact you<br />
                      3. We'll dispatch a rescue team if needed<br />
                      4. Provide medical care and rehabilitation
                    </p>
                  </div>
                </div>

                {/* When to Report */}
                <div className="flex items-start">
                  <div className="bg-[#E5F9FF] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="text-[#118AB2] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      When to Report
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      • Injured or sick animals<br />
                      • Abandoned pets<br />
                      • Animals in immediate danger<br />
                      • Wildlife in distress<br />
                      • Animal cruelty cases
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start">
                  <div className="bg-[#FFF2E5] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-[#FF9F43] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Emergency Contact
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      For immediate assistance:<br />
                      <strong>+91 9136263344</strong> (24/7)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Rescue Form */}
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
                Rescue Request Form
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
                  { id: "address", label: "Rescue Location", type: "text", required: true },
                  { 
                    id: "urgency", 
                    label: "Urgency Level", 
                    type: "select", 
                    required: true, 
                    options: [
                      { value: "not urgent", label: "Not Urgent" },
                      { value: "urgent", label: "Urgent" },
                      { value: "emergency", label: "Emergency" }
                    ]
                  },
                ].map((field, index) => (
                  <motion.div key={field.id} variants={fadeIn}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-[#5E4FA2] mb-1"
                    >
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === "select" ? (
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

                {/* Animal Image Upload */}
                <motion.div variants={fadeIn}>
                  <label
                    htmlFor="animalImage"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Animal Photo (Optional)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#CDC1FF] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FontAwesomeIcon 
                          icon={faPaw} 
                          className="text-[#5E4FA2] text-2xl mb-2" 
                        />
                        <p className="mb-2 text-sm text-[#5E4FA2]">
                          {formData.animalImage ? (
                            <span className="font-medium">{formData.animalImage.name}</span>
                          ) : (
                            <>
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </>
                          )}
                        </p>
                        <p className="text-xs text-[#5E4FA2]/70">
                          JPG, PNG (Max. 5MB)
                        </p>
                      </div>
                      <input 
                        id="animalImage" 
                        name="animalImage" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </motion.div>

                {/* Additional Notes */}
                <motion.div variants={fadeIn}>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Additional Notes
                  </label>
                  <motion.textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                    whileFocus={{ scale: 1.01 }}
                    placeholder="Describe the animal's condition, location details, etc."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#EF476F] text-white py-3 px-6 rounded-md hover:bg-[#D43D63] transition font-medium disabled:opacity-50 w-full mt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={fadeIn}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      Submitting...
                    </motion.span>
                  ) : (
                    "Submit Rescue Request"
                  )}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}