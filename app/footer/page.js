"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebook, 
  faFacebookF, 
  faInstagram, 
  faYoutube 
} from "@fortawesome/free-brands-svg-icons";
import { 
  faMapMarkerAlt, 
  faGlobe, 
  faHeart,
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F5EFFF] text-[#5E4FA2] pt-12 pb-6 border-t border-[#E5D9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center">
            <img
              src="/images/logo-1.png"
              className="h-20 w-auto"
              alt="Animal Rescue Logo"
            />
             
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-[#A294F9] mt-1" />
                <div>
                  <p className="text-sm font-medium">9 Shastri Nagar, Near Yashodhan School</p>
                  <p className="text-sm font-medium">Thane, Maharashtra 400606</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-[#A294F9]" />
                <Link 
                  href="tel:+919136263344" 
                  className="hover:text-[#A294F9] transition text-sm font-medium"
                >
                  +91 9136263344
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-[#A294F9]" />
                <Link 
                  href="mailto:info@hopeanimalcare.in" 
                  className="hover:text-[#A294F9] transition text-sm font-medium"
                >
                  info@hopeanimalcare.in
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faGlobe} className="h-5 w-5 text-[#A294F9]" />
                <Link 
                  href="https://www.hopeanimalcare.in" 
                  target="_blank"
                  className="hover:text-[#A294F9] transition text-sm font-medium"
                >
                  www.hopeanimalcare.in
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links - Matched to Navbar */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#A294F9]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#A294F9] transition font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#A294F9] transition font-medium">
                  About
                </Link>
              </li>
              <li>
                <Link href="/rescue" className="hover:text-[#A294F9] transition font-medium">
                  Rescue Stories
                </Link>
              </li>
              <li>
                <Link href="/how-to-help" className="hover:text-[#A294F9] transition font-medium">
                  How to Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#A294F9] transition font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-[#A294F9] transition font-medium flex items-center">
                  <FontAwesomeIcon icon={faHeart} className="mr-2 text-sm" />
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#A294F9]">About Us</h3>
            <p className="text-sm">
              Founded in 2021 in Thane, India by Nisha Pawar, Hope Animals Welfare Foundation 
              emerged from a simple yet powerful vision - to create a compassionate world 
              where no street animal suffers needlessly.
            </p>
            <p className="text-sm">
              What began as one woman's mission to help injured strays in her neighborhood 
              has grown into a dedicated movement.
            </p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#A294F9]">Connect With Us</h3>
            
            <div className="flex space-x-4">
              <Link 
                href="https://www.facebook.com/hopeanimalcare/" 
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#E5D9F2] flex items-center justify-center hover:bg-[#CDC1FF] transition"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-[#5E4FA2] text-xl hover:text-[#A294F9]" />
              </Link>
              <Link 
                href="https://www.facebook.com/groups/hopeanimalswelfarefoundation/" 
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#E5D9F2] flex items-center justify-center hover:bg-[#CDC1FF] transition"
                aria-label="Facebook Group"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-[#5E4FA2] text-xl hover:text-[#A294F9]" />
              </Link>
              <Link 
                href="https://www.instagram.com/hopeanimalcarein/" 
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#E5D9F2] flex items-center justify-center hover:bg-[#CDC1FF] transition"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-[#5E4FA2] text-xl hover:text-[#A294F9]" />
              </Link>
              <Link 
                href="https://www.youtube.com/channel/UC9vVr-l1KtK4P24ILu5hy3A" 
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#E5D9F2] flex items-center justify-center hover:bg-[#CDC1FF] transition"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} className="text-[#5E4FA2] text-xl hover:text-[#A294F9]" />
              </Link>
            </div>

            <div className="pt-2">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-[#A294F9]" />
                <Link 
                  href="https://maps.app.goo.gl/im233XmFBbyZQ4S8A?g_st=aw" 
                  target="_blank" 
                  className="hover:text-[#A294F9] transition text-sm font-medium"
                >
                  View on Google Maps
                </Link>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <FontAwesomeIcon icon={faGlobe} className="h-5 w-5 text-[#A294F9]" />
                <Link 
                  href="https://hope-animals-welfare-foundation.business.site/" 
                  target="_blank"
                  className="hover:text-[#A294F9] transition text-sm font-medium"
                >
                  Our Business Site
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5D9F2] pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Hope Animals Welfare Foundation. All rights reserved.</p>
          <p className="mt-2 text-xs text-[#5E4FA2]/80">
            Registered Non-Profit Organization | Thane, Maharashtra, India
          </p>
        </div>
      </div>
    </footer>
  );
}