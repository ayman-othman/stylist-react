import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkAuth } from "../../utils/utilits";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../components/PrivateRoutes/PrivateRoute";
import { PAGES_ROUTE } from "../../models/constant/pages-route";

const API_BASE_URL = "http://localhost:3500/api";

const StylistDashboard = () => {
  const navigate = useNavigate();
  const [stylistData, setStylistData] = useState(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();
  // Check authentication and fetch data
  useEffect(() => {
    const authData = checkAuth();

    if (!userData) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [stylistRes, meetingsRes] = await Promise.all([
          axios.get(
            `${API_BASE_URL}/stylist?stylist_ID=${authData.data.stylist_ID}`
          ),
          axios.get(
            `${API_BASE_URL}/meeting?stylist_ID=${authData.data.stylist_ID}`
          ),
        ]);

        const stylist = stylistRes.data[0];
        setStylistData(stylist);

        // Process meetings
        setUpcomingMeetings(meetingsRes.data.slice(0, 5)); // Show only 5 upcoming

        // Fetch reviews
        const reviewsRes = await axios.get(
          `${API_BASE_URL}/review?review_ID=%`
        );
        const stylistReviews = reviewsRes.data
          .filter((review) => review.stylist_ID === authData.data.stylist_ID)
          .sort((a, b) => b.review_ID - a.review_ID)
          .slice(0, 5);

        // Fetch user details for each review
        const reviewsWithUsers = await Promise.all(
          stylistReviews.map(async (review) => {
            const userRes = await axios.get(
              `${API_BASE_URL}/user?user_ID=${review.user_ID}`
            );
            return {
              ...review,
              user: userRes.data[0],
            };
          })
        );

        setRecentReviews(reviewsWithUsers);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Generate star rating display
  const generateStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <span key={i} className="text-yellow-400">
                ½
              </span>
            );
          } else {
            return (
              <span key={i} className="text-gray-300">
                ★
              </span>
            );
          }
        })}
        <span className="ml-2 text-gray-700">({rating.toFixed(1)})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2  gap-6 mb-10">
        <NavLink
          to={`/${PAGES_ROUTE.STYLIST_DASHBOARD}`}
          className={({ isActive }) =>
            `p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 ${
              isActive ? "bg-black text-white font-bold" : "bg-white"
            }`
          }
        >
          <div className="w-full h-full">
            <span className="relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white">
              Dashboard
            </span>
          </div>
        </NavLink>

        <NavLink
          to={`/${PAGES_ROUTE.STYLIST_PROFILE_EDIT}`}
          className={({ isActive }) =>
            `p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 ${
              isActive ? "bg-black text-white font-bold" : "bg-white"
            }`
          }
        >
          <div className="w-full h-full">
            <span className="relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white">
              Profile
            </span>
          </div>
        </NavLink>
      </div>
      {/* Dashboard Overview */}

      <div className="py-10 px-5 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Welcome Back,{" "}
              {stylistData && `${stylistData.FN} ${stylistData.LN}`}
            </h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <h3 className="text-lg text-gray-600 mb-4">Your Rating</h3>
              {stylistData && generateStarRating(stylistData.rating || 0)}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <h3 className="text-lg text-gray-600 mb-4">Total Reviews</h3>
              <div className="text-3xl font-bold text-gray-800">
                {recentReviews.length}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <h3 className="text-lg text-gray-600 mb-4">Upcoming Meetings</h3>
              <div className="text-3xl font-bold text-gray-800">
                {upcomingMeetings.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="pb-10 px-5 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Meetings Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Upcoming Meetings
              </h2>

              {upcomingMeetings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.meeting_ID}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 hover:translate-x-1"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {new Date(meeting.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {meeting.client_name || "Client"}
                        </div>
                      </div>
                      <div className="font-medium text-blue-600">
                        {meeting.time}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 py-4">No upcoming meetings</div>
              )}
            </section>

            {/* Recent Reviews Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Recent Reviews
              </h2>

              {recentReviews.length > 0 ? (
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div
                      key={review.review_ID}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 hover:translate-x-1"
                    >
                      <div className="mb-3">
                        {generateStarRating(review.rating)}
                      </div>
                      <div className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </div>
                      <div className="mt-3 text-sm text-gray-600 italic">
                        -{" "}
                        {review.user
                          ? `${review.user.FN} ${review.user.LN}`
                          : "Anonymous"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 py-4">No reviews yet</div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistDashboard;
