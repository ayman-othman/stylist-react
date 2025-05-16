import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ProfileHeader from "../../components/profile-header/ProfileHeader";
import ProfileTabs from "../../components/profile-tabs/ProfileTabs";
import ReviewsTab from "../../components/reviews-tabs/ReviewsTab";
import BookingForm from "../../components/booking-form/BookingForm";
import PortfolioTab from "../../components/portfolio-tab/PortfolioTab";
import AboutTab from "../../components/about-tab/AboutTab";
import { NavLink } from "react-router-dom";
import { PAGES_ROUTE } from "../../models/constant/pages-route";

const API_BASE_URL = "http://localhost:3500/api";

const StylistProfile = () => {
  const [stylistId, setStylistId] = useState(null);
  const [stylist, setStylist] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [portfolio, setPortfolio] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Formik for booking form
  const bookingFormik = useFormik({
    initialValues: {
      package: "",
      date: "",
      time: "",
      details: "",
    },
    validationSchema: Yup.object({
      package: Yup.string().required("Package is required"),
      date: Yup.date().required("Date is required"),
      time: Yup.string().required("Time is required"),
    }),
    onSubmit: (values) => {
      handleBookAppointment(values);
    },
  });

  // Formik for review form
  const reviewFormik = useFormik({
    initialValues: {
      rating: "",
      text: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number().required("Rating is required").min(1).max(5),
      text: Yup.string().required("Review text is required"),
    }),
    onSubmit: (values) => {
      handleSubmitReview(values);
    },
  });

  // Formik for payment form
  const paymentFormik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      transferReference: "",
      paypalEmail: "",
    },
    onSubmit: (values) => {
      handleProcessPayment(values);
    },
  });

  useEffect(() => {
    // Get stylist ID from URL
    const queryParams = new URLSearchParams(window.location.search);
    console.log("query", queryParams);
    const id = queryParams.get("id");

    if (!id) {
      setError("Stylist not found");
      return;
    }

    setStylistId(id);
    fetchStylistData(id);
  }, []);

  const fetchStylistData = async (id) => {
    try {
      setIsLoading(true);
      const [stylistRes, specsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/stylist?stylist_ID=${id}`),
        axios.get(`${API_BASE_URL}/stylist_specialization?stylist_ID=${id}`),
      ]);

      if (stylistRes.data.length === 0) {
        setError("Stylist not found");
        return;
      }

      setStylist(stylistRes.data[0]);
      setSpecializations(
        specsRes.data.map((spec) =>
          mapSpecializationToText(spec.specialization)
        )
      );
      fetchPortfolio(id);
    } catch (err) {
      console.error("Error fetching stylist data:", err);
      setError("Failed to load stylist information");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPortfolio = async (id) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/portfolio_images/stylist/${id}`
      );
      setPortfolio(res.data);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
    }
  };

  const fetchReviews = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/review?review_ID=%`);
      const stylistReviews = res.data.filter(
        (review) => review.stylist_ID === parseInt(id)
      );
      setReviews(stylistReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "reviews") {
      fetchReviews(stylistId);
    }
  };

  const handleBookAppointment = async (values) => {
    const authData = checkAuth();
    if (!authData || authData.type !== "user") {
      setError("You must be logged in as a user to book an appointment");
      return;
    }

    // Send Booking Data to meetings api
    await axios.post(`${API_BASE_URL}/meeting`, {
      meeting_date: values?.date,
      meeting_time: values?.time,
      details: values?.details,
      stylist_ID: stylistId,
      user_ID: authData.data.user_ID,
    });

    const packageDetails = getPackageDetails(values.package);
    setShowPaymentForm(true);
    // Store meeting data for payment processing
  };

  const handleSubmitReview = async (values) => {
    try {
      const authData = checkAuth();
      if (!authData || authData.type !== "user") {
        setError("You must be logged in to submit a review");
        return;
      }

      await axios.post(`${API_BASE_URL}/review`, {
        rating: values.rating,
        comment: values.text,
        stylist_ID: stylistId,
        user_ID: authData.data.user_ID,
      });

      setShowReviewForm(false);
      reviewFormik.resetForm();
      fetchReviews(stylistId);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review");
    }
  };

  const handleProcessPayment = async (values) => {
    try {
      const authData = checkAuth();
      if (!authData || authData.type !== "user") {
        setError("You must be logged in to complete payment");
        return;
      }

      // Process payment and create meeting
      setBookingSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("Payment failed. Please try again.");
    }
  };

  const mapSpecializationToText = (specialization) => {
    const map = {
      casual: "Casual Wear",
      luxury: "Luxury Fashion",
      bridal: "Bridal",
      corporate: "Corporate",
      modest: "Modest Fashion",
      hijabi: "Hijabi Wear",
      gala: "Gala Events",
      streetwear: "Street Wear",
    };
    return map[specialization.toLowerCase()] || specialization;
  };

  const getPackageDetails = (packageId) => {
    const packages = {
      basic: { name: "Basic Package", duration: 1, price: 100 },
      premium: { name: "Premium Package", duration: 2, price: 150 },
    };
    return packages[packageId];
  };

  const checkAuth = () => {
    const userJson = localStorage.getItem("styledUser");
    const stylistJson = localStorage.getItem("styledStylist");

    if (userJson) return { type: "user", data: JSON.parse(userJson) };
    if (stylistJson) return { type: "stylist", data: JSON.parse(stylistJson) };
    return null;
  };

  const generateStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>
        ))}
        {halfStar && <i className="fas fa-star-half-alt text-yellow-400"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>
        ))}
      </>
    );
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading || !stylist) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading stylist information...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto">
      {/* Profile Header */}
      <ProfileHeader
        stylist={stylist}
        specializations={specializations}
        generateStarRating={generateStarRating}
        onBookClick={() =>
          document.getElementById("booking-form").scrollIntoView()
        }
      />

      {/* Profile Tabs */}
      <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "portfolio" && <PortfolioTab portfolio={portfolio} />}

        {activeTab === "reviews" && (
          <ReviewsTab
            reviews={reviews}
            showReviewForm={showReviewForm}
            onAddReviewClick={() => setShowReviewForm(true)}
            onCancelReview={() => setShowReviewForm(false)}
            formik={reviewFormik}
            generateStarRating={generateStarRating}
          />
        )}

        {activeTab === "about" && <AboutTab stylist={stylist} />}
      </div>

      {/* Booking Form */}
      <BookingForm
        formik={bookingFormik}
        showPaymentForm={showPaymentForm}
        paymentFormik={paymentFormik}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        bookingSuccess={bookingSuccess}
      />
    </main>
  );
};

export default StylistProfile;
