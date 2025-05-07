import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:3500/api";

interface ReviewBase {
  review_ID: number;
  rating: number;
  comment: string;
  user_ID: number;
}

interface Review extends ReviewBase {
  author: string;
}

const fetchRandomReviews = async (): Promise<ReviewBase[]> => {
  console.log("dsds");
  try {
    const response = await axios.get(`${API_BASE_URL}/review`, {
      params: { review_ID: "%" },
    });
    const reviews: Review[] = response.data;
    console.log("cd", reviews);

    const uniqueReviews = Array.from(
      new Map(reviews.map((review) => [review.review_ID, review])).values()
    );

    const highRatedReviews = uniqueReviews.filter(
      (review) => review.rating >= 4.5
    );

    const shuffled = [...highRatedReviews].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, Math.min(3, shuffled.length));
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
};

const HeroSection = () => (
  <section className="flex flex-col md:flex-row justify-center items-center px-6 md:px-16 py-20 bg-gray-100 overflow-hidden">
    <div className="flex-1 max-w-xl md:pr-10">
      <h1 className="text-4xl font-bold mb-6 text-black">
        Transform Your Style Journey
      </h1>
      <p className="text-lg mb-8 text-gray-600">
        Connect with professional stylists and discover your perfect look
      </p>
      <div className="flex gap-4 justify-center md:justify-start">
        <Link
          to="/sign-up?type=user"
          className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800"
        >
          Join as Client
        </Link>
        <Link
          to="/sign-up?type=stylist"
          className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800"
        >
          Join as Stylist
        </Link>
      </div>
    </div>
    <div className="flex-1 mt-10 md:mt-0 max-w-xl">
      <img
        src="images/home.jpeg"
        alt="Fashion Collage"
        className="w-full h-[550px] rounded-lg shadow-2xl object-cover"
      />
    </div>
  </section>
);

const Features = () => (
  <section className="bg-white px-6 md:px-16 py-20 text-center">
    <h2 className="text-3xl font-bold mb-12 text-gray-800">
      Why Choose Styled?
    </h2>
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
      {[
        {
          icon: "fa-user-tie",
          title: "Expert Stylists",
          desc: "Connect with professional stylists who understand your unique style needs",
        },
        {
          icon: "fa-tshirt",
          title: "Personalized Style",
          desc: "Get customized fashion advice tailored to your preferences",
        },
        {
          icon: "fa-calendar-check",
          title: "Easy Booking",
          desc: "Schedule appointments with your favorite stylists hassle-free",
        },
        {
          icon: "fa-star",
          title: "Quality Service",
          desc: "Experience top-rated styling services from verified professionals",
        },
      ].map((feature, idx) => (
        <div
          key={idx}
          className="p-8 bg-white rounded-xl shadow-md hover:-translate-y-2 transition"
        >
          <i className={`fas ${feature.icon} text-3xl text-black mb-4`}></i>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="bg-gray-100 px-6 md:px-16 py-20 text-center">
    <h2 className="text-3xl font-bold mb-12">How It Works</h2>
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
      {[
        "Create Your Profile",
        "Find Your Stylist",
        "Book a Session",
        "Transform Your Style",
      ].map((title, idx) => (
        <div key={idx} className="p-6 bg-white rounded-xl shadow-md">
          <div className="w-10 h-10 flex items-center justify-center mx-auto mb-4 bg-black text-white rounded-full font-bold">
            {idx + 1}
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">
            {
              [
                "Sign up and tell us about your style preferences",
                "Browse through our curated list of professional stylists",
                "Schedule an appointment at your convenience",
                "Get personalized advice and achieve your fashion goals",
              ][idx]
            }
          </p>
        </div>
      ))}
    </div>
  </section>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await fetchRandomReviews();
      const cards = await Promise.all(
        fetchedReviews.map(async (review) => {
          try {
            const res = await fetch(
              `${API_BASE_URL}/user?user_ID=${review.user_ID}`
            );
            const userData = await res.json();
            const user = userData[0];
            const name = `- ${user.FN} ${user.LN ? user.LN[0] + "." : ""}`;
            return { ...review, author: name };
          } catch {
            return null;
          }
        })
      );
      setReviews(cards.filter((r): r is Review => r !== null));
    };
    getReviews();
  }, []);

  return (
    <section className="bg-white px-6 md:px-16 py-20 text-center">
      <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {reviews.length === 0 ? (
          <div className="col-span-full text-gray-500">
            No reviews available at the moment
          </div>
        ) : (
          reviews.map((review, idx) => (
            <div key={idx} className="p-6 bg-gray-100 rounded-xl shadow-md">
              <div className="text-yellow-400 mb-3 text-xl">
                {"★".repeat(Math.floor(review.rating))}
              </div>
              <p className="text-gray-700 mb-4">"{review.comment}"</p>
              <div className="text-gray-600 font-medium">{review.author}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="bg-black text-white px-6 md:px-16 py-24 text-center">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Transform Your Style?
      </h2>
      <p className="mb-8 text-lg">
        Join Styled today and connect with professional stylists who can help
        you look and feel your best.
      </p>

      <Link
        to="/sign-up"
        className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg transition"
      >
        Get Started Now
      </Link>
    </div>
  </section>
);

const Home = () => (
  <main>
    <HeroSection />
    <Features />
    <HowItWorks />
    <Testimonials />
    <CTASection />
  </main>
);

export default Home;
