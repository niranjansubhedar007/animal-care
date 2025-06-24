"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHelping, faHeart } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { supabase } from "@/utils/supabase";

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
        <div className=" mx-auto">
          <div
            className="relative h-96 bg-[#A294F9] flex items-center justify-center text-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(165, 148, 249, 0.8), rgba(165, 148, 249, 0.8)), url('/images/about-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Become a Volunteer
              </h1>
              <p className="text-xl md:text-2xl">
                {" "}
                Join our mission to create a compassionate world for street
                animals. <br /> Your time and skills can make a real difference!
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-5 grid md:grid-cols-2 gap-8 mb-12 bg-white">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#A294F9] mb-4">
                Why Volunteer With Us?
              </h2>

              <div className="space-y-4">
              

                <div className="flex items-start">
                  <div className="bg-[#E5D9F2] p-2 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-[#A294F9]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E4FA2]">
                      Be a Voice for the Voiceless
                    </h3>
                    <p className="text-sm text-[#5E4FA2]/90">
                      Advocate for animals and raise awareness in your community
                      about their rights and needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#E5D9F2] p-2 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-[#A294F9]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E4FA2]">
                      Create Lifelong Memories
                    </h3>
                    <p className="text-sm text-[#5E4FA2]/90">
                      Every rescue and recovery story becomes a cherished memory
                      you'll carry forever.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#E5D9F2] p-2 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-[#A294F9]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E4FA2]">
                      Make a Direct Impact
                    </h3>
                    <p className="text-sm text-[#5E4FA2]/90">
                      See the immediate difference you make in animals' lives
                      through rescue, care, and rehabilitation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#E5D9F2] p-2 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-[#A294F9]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E4FA2]">
                      Learn New Skills
                    </h3>
                    <p className="text-sm text-[#5E4FA2]/90">
                      Gain hands-on experience in animal care, first aid, and
                      community outreach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#E5D9F2] p-2 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-[#A294F9]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E4FA2]">
                      Join a Compassionate Community
                    </h3>
                    <p className="text-sm text-[#5E4FA2]/90">
                      Connect with like-minded people who share your passion for
                      animal welfare.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#E5D9F2] p-2 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-[#A294F9]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E4FA2]">
                      Flexible Opportunities
                    </h3>
                    <p className="text-sm text-[#5E4FA2]/90">
                      Choose from various roles that fit your schedule and
                      interests - from field rescues to admin support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#E5D9F2] p-2 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-[#A294F9]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E4FA2]">
                      Personal Growth
                    </h3>
                    <p className="text-sm text-[#5E4FA2]/90">
                      Develop empathy, patience, and leadership skills while
                      making a difference.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteer Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#A294F9] mb-6">
                Volunteer Application
              </h2>

              {submitStatus.message && (
                <div
                  className={`p-4 mb-4 rounded-md ${
                    submitStatus.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields remain unchanged */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Location (City/Area) *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
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
                    Email ID *
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
                    htmlFor="address"
                    className="block text-sm font-medium text-[#5E4FA2] mb-1"
                  >
                    Full Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#A294F9] text-white py-3 px-4 rounded-md hover:bg-[#8A7BD8] transition flex items-center justify-center font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <FontAwesomeIcon icon={faHandsHelping} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
