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

export default function HowToHelp() {
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5EFFF]">
        {/* Hero Section */}
        <div
          className="relative h-96 bg-[#A294F9] flex items-center justify-center text-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162, 148, 249, 0.8), rgba(162, 148, 249, 0.8)), url('/images/help-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How You Can Help
            </h1>
            <p className="text-xl md:text-2xl">
              Every action counts in our mission to protect and care for animals
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5E4FA2] mb-4">
              Many Ways to Make a Difference
            </h2>
            <p className="text-lg text-[#5E4FA2]/90 max-w-3xl mx-auto">
              Whether you have time, resources, or skills to share, there are numerous
              ways you can contribute to our cause and help animals in need.
            </p>
          </div>

          {/* Ways to Help Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {waysToHelp.map((way, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="text-[#A294F9] text-4xl mb-4">
                  <FontAwesomeIcon icon={way.icon} />
                </div>
                <h3 className="text-xl font-bold text-[#5E4FA2] mb-3">
                  {way.title}
                </h3>
                <p className="text-[#5E4FA2]/90 mb-4">{way.description}</p>
                <ul className="space-y-2">
                  {way.actions.map((action, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#A294F9] mr-2">•</span>
                      <span className="text-[#5E4FA2]">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-[#E5D9F2] rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-[#5E4FA2] mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-[#5E4FA2]/90 mb-6 max-w-2xl mx-auto">
              Join our community of animal lovers and be part of the change you
              want to see in the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
<Link href="/volunteer">
              <button className="bg-[#A294F9] text-white px-6 py-3 rounded-md hover:bg-[#8A7BD8] transition font-medium">
                Volunteer Now
              </button>
              </Link>
<Link href="/donate">

              <button className="bg-white text-[#5E4FA2] px-6 py-3 rounded-md hover:bg-gray-100 transition font-medium border border-[#CDC1FF]">
                Donate Today
              </button>
              </Link>

<Link href="/contact">

              <button className="bg-[#5E4FA2] text-white px-6 py-3 rounded-md hover:bg-[#4D4396] transition font-medium">
                Contact Us
              </button>
              </Link>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}