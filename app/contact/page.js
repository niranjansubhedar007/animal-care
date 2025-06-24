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
        {/* Hero Section */}
        <div
          className="relative h-96 bg-[#A294F9] flex items-center justify-center text-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162, 148, 249, 0.8), rgba(162, 148, 249, 0.8)), url('/images/contact-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl">
              We'd love to hear from you! Reach out for inquiries, support, or to
              get involved.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#5E4FA2] mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <div className="text-[#A294F9] text-xl mt-1 mr-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
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
                    <a
                      href="https://maps.app.goo.gl/im233XmFBbyZQ4S8A?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A294F9] hover:underline mt-2 inline-block"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="text-[#A294F9] text-xl mt-1 mr-4">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Phone Number
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      <a
                        href="tel:+919136263344"
                        className="hover:text-[#A294F9] transition"
                      >
                        +91 9136263344
                      </a>
                    </p>
                    <p className="text-sm text-[#5E4FA2]/80 mt-1">
                      (Monday to Saturday, 9am to 6pm)
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="text-[#A294F9] text-xl mt-1 mr-4">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Email Address
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      <a
                        href="mailto:info@hopeanimalcare.in"
                        className="hover:text-[#A294F9] transition"
                      >
                        info@hopeanimalcare.in
                      </a>
                    </p>
                    <p className="text-sm text-[#5E4FA2]/80 mt-1">
                      For general inquiries
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="text-[#A294F9] text-xl mt-1 mr-4">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#5E4FA2]">
                      Shelter Hours
                    </h3>
                    <p className="text-[#5E4FA2]/90">
                      Monday to Saturday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-[#5E4FA2]/90">Sunday: Closed</p>
                    <p className="text-sm text-[#5E4FA2]/80 mt-1">
                      (Emergency rescues available 24/7)
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-[#5E4FA2] mb-3">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/hopeanimalcare/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#E5D9F2] hover:bg-[#CDC1FF] w-10 h-10 rounded-full flex items-center justify-center transition"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="w-5 h-5 text-[#5E4FA2]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/hopeanimalcarein/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#E5D9F2] hover:bg-[#CDC1FF] w-10 h-10 rounded-full flex items-center justify-center transition"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="w-5 h-5 text-[#5E4FA2]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UC9vVr-l1KtK4P24ILu5hy3A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#E5D9F2] hover:bg-[#CDC1FF] w-10 h-10 rounded-full flex items-center justify-center transition"
                    >
                      <span className="sr-only">YouTube</span>
                      <svg
                        className="w-5 h-5 text-[#5E4FA2]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#5E4FA2] mb-6">
                Send Us a Message
              </h2>

              {submitStatus.message && (
                <div
                  className={`mb-6 p-4 rounded-md ${
                    submitStatus.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="Adoption">Adoption Inquiry</option>
                    <option value="Volunteer">Volunteer Opportunity</option>
                    <option value="Donation">Donation Question</option>
                    <option value="Rescue">Animal Rescue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#A294F9] text-white py-3 px-6 rounded-md hover:bg-[#8A7BD8] transition font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.123456789012!2d72.98765432101234!3d19.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzI0LjQiTiA3MsKwNTknMTYuOCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Hope Animals Welfare Foundation Location"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}