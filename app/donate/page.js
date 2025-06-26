"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faHandHoldingHeart, faShieldAlt, 
  faChartLine, faReceipt, faRupeeSign, faQuoteLeft,
  faArrowLeft, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../navbar/page';
import Footer from '../footer/page';

const Donate = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 50 Donor Testimonials
  const testimonials = [
    // Original 5 testimonials
    {
      quote: "I've been donating monthly for two years and receive regular updates showing exactly how my money is used. Seeing the before-and-after photos of rescued animals keeps me motivated to give.",
      name: "Rajesh Mehta",
      role: "Monthly Donor"
    },
    {
      quote: "After seeing the terrible condition of street dogs in my area, I donated for their medical care. The team sent me personal updates on each dog's recovery journey - such transparency is rare!",
      name: "Priya Kulkarni",
      role: "First-time Donor"
    },
    {
      quote: "As a business owner, I appreciate the tax benefits but what really matters is knowing my contribution directly saved 5 puppies from parvovirus. The team even let me name one!",
      name: "Arjun Deshpande",
      role: "Corporate Sponsor"
    },
    {
      quote: "I sponsored a cow's medical treatment and was invited to visit her at the sanctuary. Seeing her healthy and happy made me commit to regular donations. Their follow-up is exceptional.",
      name: "Meena Patel",
      role: "Animal Sponsor"
    },
    {
      quote: "The detailed reports showing how every rupee was spent convinced me to increase my donation amount. This is one of the few NGOs I trust completely with my money.",
      name: "Dr. Sameer Joshi",
      role: "Major Donor"
    },

    // Additional 45 testimonials
    {
      quote: "My children insisted we donate after seeing your rescue videos. Now they save part of their allowance each month to help animals. You've inspired the next generation!",
      name: "Sunita Rao",
      role: "Family Donor"
    },
    {
      quote: "I was skeptical at first, but the detailed financial reports convinced me this is one of the most transparent NGOs I've encountered. Now I donate quarterly.",
      name: "Vikram Joshi",
      role: "Quarterly Donor"
    },
    {
      quote: "After rescuing an injured dog myself, I knew I had to support your work. The vet care you provide is exceptional and the animals clearly adore your team.",
      name: "Rahul Sharma",
      role: "Rescuer & Donor"
    },
    {
      quote: "Our company matches employee donations to your foundation because we've seen the measurable impact you make in our community. Keep up the great work!",
      name: "Neha Kapoor",
      role: "Corporate Donor"
    },
    {
      quote: "I donate in memory of my beloved pet. Knowing other animals get a second chance at life brings me comfort. Thank you for this meaningful tribute option.",
      name: "Ananya Iyer",
      role: "Memorial Donor"
    },
    {
      quote: "The sterilization program is genius - solving the root cause of animal suffering. I specifically donate to this initiative each month.",
      name: "Dr. Amit Desai",
      role: "Program-Specific Donor"
    },
    {
      quote: "I've volunteered at many shelters, but your facility stands out for its cleanliness and the animals' obvious happiness. That's why I donate.",
      name: "Kavita Menon",
      role: "Volunteer & Donor"
    },
    {
      quote: "Your emergency rescue team saved a kitten stuck in my building's drain. Their quick response amazed me. I donated that same day!",
      name: "Rohan Malhotra",
      role: "Grateful Neighbor"
    },
    {
      quote: "As an NRI, I appreciate how easy you make it to donate from abroad. The video updates showing my sponsored animal's progress are priceless.",
      name: "Arun Nair",
      role: "NRI Supporter"
    },
    {
      quote: "I started with a small donation, but after seeing the impact, I've increased my contribution every year. You've earned my trust.",
      name: "Deepika Choudhary",
      role: "Growing Donor"
    },
    {
      quote: "Your educational programs in schools are creating real change. I donate specifically to help teach children compassion toward animals.",
      name: "Prof. Sanjay Verma",
      role: "Education Supporter"
    },
    {
      quote: "The adoption events you organize are so well-run. After adopting my dog, I became a monthly donor to help others find their perfect pet.",
      name: "Nandini Gupta",
      role: "Adopter & Donor"
    },
    {
      quote: "I donate stocks instead of cash for tax benefits. Your team makes the process seamless and explains everything clearly.",
      name: "Rakesh Bajaj",
      role: "Stock Donor"
    },
    {
      quote: "Your sanctuary tours showed me exactly where my money goes. The animals' living conditions are better than some human homes!",
      name: "Ishaan Patel",
      role: "Sanctuary Visitor"
    },
    {
      quote: "When I donated my birthday funds instead of gifts, you sent a beautiful thank you video from the animals. Made my day!",
      name: "Aarav Khanna",
      role: "Birthday Donor"
    },
    {
      quote: "The matching gift program through my employer doubled my donation. Thank you for making partnerships so easy!",
      name: "Shalini Nair",
      role: "Matching Gift Donor"
    },
    {
      quote: "I donate in honor of my veterinarian sister. She says your medical care rivals the best pet hospitals she's seen.",
      name: "Riya Mathur",
      role: "Tribute Donor"
    },
    {
      quote: "Your crowdfunding campaigns tell such compelling stories. I've donated to several specific rescues and followed their journeys.",
      name: "Varun Sethi",
      role: "Campaign Donor"
    },
    {
      quote: "The donor appreciation events make me feel like part of the family. I've met fellow animal lovers who became friends.",
      name: "Anjali Kapoor",
      role: "Community Donor"
    },
    {
      quote: "I was impressed you accept cryptocurrency donations. As a crypto investor, this lets me support causes I care about easily.",
      name: "Aditya Rao",
      role: "Crypto Donor"
    },
    {
      quote: "Your year-end impact report convinced me to make my first donation. The statistics showed real, measurable change.",
      name: "Neha Krishnan",
      role: "Report-Inspired Donor"
    },
    {
      quote: "After you helped my neighbor with their injured pet at no cost, our entire apartment building pooled funds to donate.",
      name: "Mrs. Sharma",
      role: "Community Organizer"
    },
    {
      quote: "The option to sponsor a specific animal's care attracted me. Getting updates 'from' my sponsored dog is delightful!",
      name: "Rahul Khanna",
      role: "Animal Sponsor"
    },
    {
      quote: "Your low administrative costs (just 8%!) show most funds go directly to animals. That efficiency earned my donation.",
      name: "Amitabh Joshi",
      role: "Finance-Savvy Donor"
    },
    {
      quote: "I donate goods instead of money - food, blankets, medicines. Your wishlist makes it easy to give what's needed most.",
      name: "Sunil Kapoor",
      role: "In-Kind Donor"
    },
    {
      quote: "The donor wall at your facility, even for small donations, made me feel appreciated. Now I give monthly.",
      name: "Priya Malhotra",
      role: "Recognition-Inspired Donor"
    },
    {
      quote: "Your focus on both companion animals and wildlife is unique. I donate because you help all creatures great and small.",
      name: "Dr. Ananya Iyer",
      role: "Veterinarian Donor"
    },
    {
      quote: "When I expressed interest in legacy giving, your team provided clear, no-pressure guidance. I've included you in my will.",
      name: "Mr. Oberoi",
      role: "Legacy Donor"
    },
    {
      quote: "The volunteer opportunities for donors create such a personal connection. Hands-on work deepened my commitment.",
      name: "Karan Mehta",
      role: "Hands-On Donor"
    },
    {
      quote: "Your social media shows real rescue work, not just sad stories. Seeing the happy endings inspired my first gift.",
      name: "Riya Kapoor",
      role: "Social Media Follower"
    },
    {
      quote: "The donor newsletter's 'cost per life saved' metric is brilliant. It makes my contribution feel tangible and important.",
      name: "Arjun Seth",
      role: "Data-Inspired Donor"
    },
    {
      quote: "After my dog passed, donating in her memory helped my grief. The personalized certificate meant the world to me.",
      name: "Mrs. Desai",
      role: "Memorial Donor"
    },
    {
      quote: "Your focus on sustainable solutions (not just rescues) shows real foresight. I donate to support this long-term thinking.",
      name: "Prof. Menon",
      role: "Strategic Donor"
    },
    {
      quote: "The option to cover transaction fees means 100% of my donation goes to the animals. Small but meaningful detail!",
      name: "Aditi Chavan",
      role: "Fee-Covering Donor"
    },
    {
      quote: "Your emergency rescue fund saves lives daily. I keep my donation auto-renewing because crises don't keep business hours.",
      name: "Rohit Nair",
      role: "Emergency Fund Donor"
    },
    {
      quote: "The foster program's success stories convinced me to donate. Temporary homes make permanent differences!",
      name: "Ananya Joshi",
      role: "Foster Program Supporter"
    },
    {
      quote: "I donate stocks annually. Your finance team handles everything perfectly and sends prompt tax receipts.",
      name: "Vikram Patel",
      role: "Recurring Stock Donor"
    },
    {
      quote: "Your community cat program is brilliant - humane, effective, and scalable. I donate specifically to support this initiative.",
      name: "Dr. Priya Rao",
      role: "TNR Program Donor"
    },
    {
      quote: "After attending your fundraising gala, I was so moved I increased my pledge. The stories shared were unforgettable.",
      name: "Rahul Bajaj",
      role: "Event-Inspired Donor"
    },
    {
      quote: "The option to donate securities was surprisingly simple. More nonprofits should offer this tax-smart giving option!",
      name: "Naina Kohli",
      role: "Securities Donor"
    },
    {
      quote: "Your mobile donation station at community events makes giving effortless. I've donated three times this way!",
      name: "Armaan Sethi",
      role: "Impulse Donor"
    },
    {
      quote: "I donate through my DAF because your organization makes the paperwork seamless. You clearly understand donor needs.",
      name: "Mrs. Khanna",
      role: "DAF Donor"
    },
    {
      quote: "The matching gift portal saved me hours of paperwork. My company's donation matched mine within days!",
      name: "Rohan Kapoor",
      role: "Matching Gift Donor"
    },
    {
      quote: "Your 'donate your birthday' Facebook tool helped me raise ₹50,000 from friends! The automated thank-yous were classy.",
      name: "Aanya Malhotra",
      role: "Birthday Fundraiser"
    },
    {
      quote: "The planned giving webinar was so informative. I've now included Hope Animals in my estate plans.",
      name: "Mr. & Mrs. Iyer",
      role: "Legacy Society Members"
    },
    {
      quote: "Your donor app makes giving effortless. I can donate, track impact, and message the team all in one place!",
      name: "Kabir Choudhary",
      role: "Tech-Savvy Donor"
    },
    {
      quote: "The corporate volunteer day with donation matching was brilliant team-building. Our company now donates annually.",
      name: "Neha Sharma",
      role: "Corporate Leader"
    },
    {
      quote: "I donate airline miles to transport rescued animals. Your creative giving options help me give in multiple ways!",
      name: "Rahul Nair",
      role: "Miles Donor"
    },
    {
      quote: "Your donor impact reports show my ₹5,000 donation spayed 20 street dogs. That's measurable change I can believe in!",
      name: "Anika Patel",
      role: "Results-Focused Donor"
    }
  ];

  // Slider functionality
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeTestimonial]);

  // Get current testimonials to display (3 at a time)
  const getCurrentTestimonials = () => {
    const current = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeTestimonial + i) % testimonials.length;
      current.push(testimonials[index]);
    }
    return current;
  };

  return (
    <>
      <Navbar />
      <div className="font-sans bg-[#F5EFFF] min-h-screen">
        {/* Hero Section */}
        <div className="relative h-80 flex items-center justify-center text-center bg-[#A294F9]">
          <div className="text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h1>
            <p className="text-xl md:text-2xl">Your donation saves lives</p>
          </div>
        </div>

        {/* Donation Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Donation Options */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#5E4FA2] mb-8">                  Scan to Donate
</h2>
              
              {/* QR Code Donation */}
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <img 
                      src="/images/qr-code.jpg" 
                      alt="Donation QR Code" 
                      width={500}
                      height={550}
                      className=" object-contain"
                    />
                  </div>
                  </div>
                  </div>
              

              {/* Bank Transfer */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-[#5E4FA2] mb-4 flex items-center">
                  <FontAwesomeIcon icon={faReceipt} className="mr-3" />
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
              </div>
            </div>

            {/* Why Donate Section */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#5E4FA2] mb-8">Why Donate to Us?</h2>
              
              <div className="space-y-6">
                {/* Reason 1 */}
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                  <div className="bg-[#A294F9] text-white p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faHeart} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#5E4FA2] mb-2">Direct Impact</h3>
                    <p className="text-gray-700">
                      Every rupee goes directly to animal care - medical treatment, food, shelter, and rehabilitation. 
                      We maintain complete transparency in fund utilization.
                    </p>
                  </div>
                </div>

                {/* Reason 2 */}
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                  <div className="bg-[#A294F9] text-white p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faHandHoldingHeart} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#5E4FA2] mb-2">Proven Track Record</h3>
                    <p className="text-gray-700">
                      Since 2021, we've rescued over 2,500 animals with a 92% success rate. 
                      Your donation contributes to this life-saving work.
                    </p>
                  </div>
                </div>

                {/* Reason 3 */}
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                  <div className="bg-[#A294F9] text-white p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#5E4FA2] mb-2">Sustainable Solutions</h3>
                    <p className="text-gray-700">
                      We don't just rescue - we implement long-term solutions like sterilization programs 
                      and community education to prevent future suffering.
                    </p>
                  </div>
                </div>

                {/* Reason 4 */}
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                  <div className="bg-[#A294F9] text-white p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faChartLine} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#5E4FA2] mb-2">Tax Benefits</h3>
                    <p className="text-gray-700">
                      All donations are eligible for 80G tax exemption under Indian tax laws. 
                      We provide receipts for all contributions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Donation Impact */}
              <div className="bg-[#E5D9F2] p-8 rounded-xl mt-8">
                <h3 className="text-2xl font-semibold text-[#5E4FA2] mb-4">Your Donation's Impact</h3>
                <ul className="space-y-3 text-[#5E4FA2]">
                  <li className="flex items-start">
                    <div className="bg-[#5E4FA2] w-2 h-2 rounded-full mt-2 mr-3"></div>
                    <span><strong>₹500</strong> - Feeds 10 stray dogs for a week</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#5E4FA2] w-2 h-2 rounded-full mt-2 mr-3"></div>
                    <span><strong>₹1,000</strong> - Covers vaccination for 5 animals</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#5E4FA2] w-2 h-2 rounded-full mt-2 mr-3"></div>
                    <span><strong>₹2,500</strong> - Funds one sterilization surgery</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#5E4FA2] w-2 h-2 rounded-full mt-2 mr-3"></div>
                    <span><strong>₹5,000</strong> - Provides emergency medical care</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Slider */}
        <div className="bg-[#CDC1FF] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-[#5E4FA2] mb-12">What Our 50+ Donors Say</h2>
            
            <div className="relative">
              {/* Testimonial Cards - Showing 3 at a time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getCurrentTestimonials().map((testimonial, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
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
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
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
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.slice(0, 10).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index * 5)}
                    className={`h-3 w-3 rounded-full transition-all ${Math.floor(activeTestimonial/5) === index ? 'bg-[#5E4FA2] w-6' : 'bg-[#A294F9]'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#A294F9] py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Join Our Community of Compassionate Donors</h2>
            <p className="text-xl mb-8">
              Be part of the change. Your support makes all the difference.
            </p>
         
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Donate;