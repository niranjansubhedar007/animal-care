"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  fanumber,
  faEnvelope,
  faClock,
  faUserGraduate,
  faFilePdf,
  faCalculator,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { supabase } from "@/utils/supabase";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Recrui() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    education: "",
    address: "",
    resume: null,
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
    triggerOnce: true,
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
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
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First upload the PDF file
      let resumeUrl = null;
      if (formData.resume) {
        const fileExt = formData.resume.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `resume/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("resume")
          .upload(filePath, formData.resume);

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from("resume")
          .getPublicUrl(filePath);

        resumeUrl = urlData.publicUrl;
      }

      // Then insert the record into the resume table
      const { data, error } = await supabase
        .from("resume")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            number: formData.number,
            education: formData.education,
            address: formData.address,
            resume_url: resumeUrl,
          },
        ])
        .select();

      if (error) throw error;

      setSubmitStatus({
        success: true,
        message:
          "Thank you for your application! We'll review your information and contact you soon.",
      });
      setFormData({
        name: "",
        email: "",
        number: "",
        education: "",
        address: "",
        resume: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message:
          "There was an error submitting your application. Please try again.",
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
              Join Our Team
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              We're always looking for passionate individuals to help animals in
              need.
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
            {/* Recruitment Information */}
            <motion.div variants={fadeIn}>
              <motion.h2
                className="text-3xl font-bold text-[#5E4FA2] mb-6"
                whileInView={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Why Join Us?
              </motion.h2>

              <div className="space-y-6">
                {/* Mission */}
                <div className="flex items-start">
                  <div className="bg-[#FFEEEE] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-[#EF476F] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Our Mission
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      We're dedicated to rescuing, rehabilitating, and rehoming
                      animals in need. Join us to make a real difference in
                      their lives.
                    </p>
                  </div>
                </div>

                {/* Positions */}
                <div className="flex items-start">
                  <div className="bg-[#E5F9FF] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      className="text-[#118AB2] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Open Positions
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      • Animal Care Specialist
                      <br />
                      • Veterinary Assistant
                      <br />
                      • Rescue Coordinator
                      <br />
                      • Volunteer Manager
                      <br />• Fundraising Coordinator
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="flex items-start">
                  <div className="bg-[#FFF2E5] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-[#FF9F43] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Benefits
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      • Meaningful work saving lives
                      <br />
                      • Flexible scheduling
                      <br />
                      • Training provided
                      <br />
                      • Supportive team environment
                      <br />• Opportunities for growth
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start">
                  <div className="bg-[#F0FFE5] p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faQuestion}
                      className="text-[#6BCB77] text-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Questions?
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      Call us at +91 9136263344
                      <br />
                      or email info@hopeanimalcare.in
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Application Form */}
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
                Application Form
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
                  {
                    id: "name",
                    label: "Full Name",
                    type: "text",
                    required: true,
                  },
                  {
                    id: "email",
                    label: "Email Address",
                    type: "email",
                    required: true,
                  },
                    {
                    id: "address",
                    label: "Address",
                    type: "textarea",
                    required: true,
                  },
                  {
                    id: "number",
                    label: "Phone Number",
                    type: "tel",
                    required: true,
                  },
                  {
                    id: "education",
                    label: "Education",
                    type: "select",
                    required: true,
                    options: [
                      { value: "", label: "Select your education level" },
                      { value: "High School", label: "High School" },
                      { value: "Diploma", label: "Diploma" },
                      {
                        value: "Bachelor's Degree",
                        label: "Bachelor's Degree",
                      },
                      { value: "Master's Degree", label: "Master's Degree" },
                      { value: "Other", label: "Other" },
                    ],
                  },
                 // Add this line
                ].map((field, index) => (
                  <motion.div key={field.id} variants={fadeIn}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-[#5E4FA2] mb-1"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
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
                        {field.options.map((option) => (
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

                {/* Resume Upload */}
                <motion.div variants={fadeIn}>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Resume (PDF only)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#CDC1FF] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className="text-[#5E4FA2] text-2xl mb-2"
                        />
                        <p className="mb-2 text-sm text-[#5E4FA2]">
                          {formData.resume ? (
                            <span className="font-medium">
                              {formData.resume.name}
                            </span>
                          ) : (
                            <>
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </>
                          )}
                        </p>
                        <p className="text-xs text-[#5E4FA2]/70">
                          PDF only (Max. 5MB)
                        </p>
                      </div>
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#A294F9] text-white py-3 px-6 rounded-md hover:bg-[#8A7BD8] transition font-medium disabled:opacity-50 w-full mt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={fadeIn}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      Submitting...
                    </motion.span>
                  ) : (
                    "Submit"
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
