"use client";

import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { supabase } from "@/utils/supabase";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    hoverRating: 0,
  });
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const reviewsPerSlide = 3;
  const autoSlideInterval = 3000; // 5 seconds

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formattedReviews = data.map((review) => ({
          id: review.id,
          name: review.name,
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.created_at).toISOString().split("T")[0],
        }));

        setReviews(formattedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setSubmitStatus({
          success: false,
          message: "Failed to load reviews. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= reviewsPerSlide) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [reviews.length, currentSlide, isAutoPlaying]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleHoverRating = (rating) => {
    setNewReview((prev) => ({ ...prev, hoverRating: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      setSubmitStatus({
        success: false,
        message: "Please fill all required fields",
      });
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            name: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment,
          },
        ])
        .select();

      if (error) throw error;

      const addedReview = data[0];
      setReviews((prev) => [
        {
          id: addedReview.id,
          name: addedReview.name,
          rating: addedReview.rating,
          comment: addedReview.comment,
          date: new Date(addedReview.created_at).toISOString().split("T")[0],
        },
        ...prev,
      ]);

      setSubmitStatus({
        success: true,
        message: "Thank you for your review!",
      });

      setNewReview({
        name: "",
        rating: 0,
        comment: "",
        hoverRating: 0,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to submit review. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev >= Math.ceil(reviews.length / reviewsPerSlide) - 1 ? 0 : prev + 1
    );
  }, [reviews.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(reviews.length / reviewsPerSlide) - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  const getVisibleReviews = () => {
    const startIndex = currentSlide * reviewsPerSlide;
    return reviews.slice(startIndex, startIndex + reviewsPerSlide);
  };

  if (isLoading && reviews.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F5EFFF] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A294F9] mx-auto"></div>
            <p className="mt-4 text-[#5E4FA2]">Loading reviews...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5EFFF]">
        {/* Hero Header */}
        <div
          className="relative h-96 bg-[#A294F9] flex items-center justify-center text-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162, 148, 249, 0.8), rgba(162, 148, 249, 0.8)), url('/images/reviews-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Share Your Experience
            </h1>
            <p className="text-xl md:text-2xl">
              Your feedback helps us improve and continue our mission <br /> to
              help animals in need
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Review Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-[#5E4FA2] mb-6">
              Leave a Review
            </h2>

            {submitStatus.message && (
              <div
                className={`mb-4 p-4 rounded-md ${
                  submitStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={newReview.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5E4FA2] mb-2">
                  Your Rating *
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => handleHoverRating(star)}
                      onMouseLeave={() => handleHoverRating(0)}
                      className="text-2xl focus:outline-none"
                    >
                      <FontAwesomeIcon
                        icon={
                          (newReview.hoverRating || newReview.rating) >= star
                            ? solidStar
                            : regularStar
                        }
                        className={
                          (newReview.hoverRating || newReview.rating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-[#5E4FA2] mb-1"
                >
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-[#CDC1FF] rounded-md focus:ring-2 focus:ring-[#A294F9] focus:border-transparent"
                  placeholder="Share your experience with Hope Animals Welfare Foundation..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#A294F9] text-white py-3 px-6 rounded-md hover:bg-[#8A7BD8] transition font-medium disabled:opacity-50"
              >
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>

        {/* Reviews Slider */}
      </div>
      <div className="max-w-7xl mx-auto lg:p-7 md:p-6 p-1 bg-white ">
      <div className="bg-white rounded-lg shadow-md p-6 mx-4 md:mx-10 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#5E4FA2]">
            What People Say About Us
          </h2>
          {reviews.length > reviewsPerSlide && (
            <button
              onClick={toggleAutoPlay}
              className="bg-[#E5D9F2] p-2 rounded-full hover:bg-[#CDC1FF] transition"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#5E4FA2]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#5E4FA2]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-300 ease-in-out"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getVisibleReviews().map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#F5EFFF] p-4 rounded-lg h-full"
                    >
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FontAwesomeIcon
                            key={star}
                            icon={
                              review.rating >= star ? solidStar : regularStar
                            }
                            className={`text-xl ${
                              review.rating >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-lg text-[#5E4FA2] mb-3 italic">
                        "{review.comment}"
                      </p>
                      <p className="font-bold text-[#A294F9]">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {reviews.length > reviewsPerSlide && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-[#E5D9F2] p-2 rounded-full hover:bg-[#CDC1FF] transition"
                  aria-label="Previous reviews"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#5E4FA2]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-[#E5D9F2] p-2 rounded-full hover:bg-[#CDC1FF] transition"
                  aria-label="Next reviews"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#5E4FA2]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {reviews.length > reviewsPerSlide && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({
                  length: Math.ceil(reviews.length / reviewsPerSlide),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-[#A294F9] w-4"
                        : "bg-[#E5D9F2]"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-[#5E4FA2]">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
      </div>

      <Footer />
    </>
  );
}
