import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { checkAuth } from "../../utils/utilits";
import { PAGES_ROUTE } from "../../models/constant/pages-route";
const StylistProfileEdit = () => {
  const navigate = useNavigate();
  const [stylistData, setStylistData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const profileImageRef = useRef(null);
  const portfolioImagesRef = useRef(null);

  // Validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    about: Yup.string(),
    specializations: Yup.array().min(
      1,
      "At least one specialization is required"
    ),
  });

  // Load stylist data
  useEffect(() => {
    const authData = checkAuth();

    if (!authData || authData.type !== "stylist") {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const response = await axios.get(
          `/api/stylists/${authData.data.stylist_ID}`
        );
        setStylistData(response.data);
        setProfileImage(
          response.data.profileImage ||
            "images/stylist-photos/default-stylist.jpeg"
        );
        setPortfolioImages(response.data.portfolio || []);
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    
  }, [navigate]);

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle portfolio images change
  const handlePortfolioImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          if (newImages.length === files.length) {
            setPortfolioImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove portfolio image
  const removePortfolioImage = (index) => {
    setPortfolioImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      // Append form values
      Object.entries(values).forEach(([key, value]) => {
        if (key === "specializations") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      // Append images
      if (profileImageRef.current.files[0]) {
        formData.append("profileImage", profileImageRef.current.files[0]);
      }

      if (portfolioImagesRef.current.files.length > 0) {
        Array.from(portfolioImagesRef.current.files).forEach((file) => {
          formData.append("portfolioImages", file);
        });
      }

      // Send to API
      await axios.put(`/api/stylists/${stylistData.stylist_ID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Profile updated successfully");
      setTimeout(() => navigate("/stylist-home"), 2000);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 px-5">
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
          to={`/${PAGES_ROUTE.STYLIST_PROFILE}`}
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


      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          Edit Your Profile
        </h1>

        <Formik
          initialValues={{
            firstName: stylistData?.firstName || "",
            lastName: stylistData?.lastName || "",
            email: stylistData?.email || "",
            about: stylistData?.about || "",
            specializations: stylistData?.specializations || [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-md">
              {/* Profile Picture Section */}
              <div className="mb-10 pb-8 border-b border-gray-200">
                <h2 className="text-2xl font-semibold mb-6">Profile Picture</h2>
                <div className="flex items-center gap-8">
                  <img
                    id="profile-preview"
                    src={profileImage}
                    alt="Profile Preview"
                    className="w-36 h-36 rounded-full object-cover shadow-md"
                  />
                  <div className="flex flex-col gap-3">
                    <input
                      type="file"
                      id="profile-image"
                      ref={profileImageRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                    <button
                      type="button"
                      onClick={() => profileImageRef.current.click()}
                      className="px-6 py-3 bg-white text-black border-2 border-black rounded-full font-medium hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1"
                    >
                      Change Picture
                    </button>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="mb-10 pb-8 border-b border-gray-200">
                <h2 className="text-2xl font-semibold mb-6">
                  Basic Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-2">
                      First Name *
                    </label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2">
                      Last Name *
                    </label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2">
                      Email *
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-10 pb-8 border-b border-gray-200">
                <h2 className="text-2xl font-semibold mb-6">About</h2>
                <div>
                  <label htmlFor="about" className="block mb-2">
                    Bio
                  </label>
                  <Field
                    as="textarea"
                    id="about"
                    name="about"
                    rows="5"
                    placeholder="Tell clients about yourself and your styling experience..."
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-10 pb-8 border-b border-gray-200">
                <h2 className="text-2xl font-semibold mb-6">Specializations</h2>
                <div>
                  <label htmlFor="specializations" className="block mb-2">
                    Select Your Specializations *
                  </label>
                  <Field
                    as="select"
                    id="specializations"
                    name="specializations"
                    multiple
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black min-h-[150px]"
                    value={values.specializations}
                    onChange={(e) => {
                      const options = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      setFieldValue("specializations", options);
                    }}
                  >
                    <option value="casual">Casual Wear</option>
                    <option value="luxury">Luxury Fashion</option>
                    <option value="bridal">Bridal</option>
                    <option value="corporate">Corporate</option>
                    <option value="modest">Modest Fashion</option>
                    <option value="hijabi">Hijabi Wear</option>
                    <option value="gala">Gala Events</option>
                    <option value="streetwear">Street Wear</option>
                  </Field>
                  <ErrorMessage
                    name="specializations"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-6">Portfolio</h2>
                <div className="mt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
                    {portfolioImages.map((img, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition-transform duration-300 h-64"
                      >
                        <img
                          src={img}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => removePortfolioImage(index)}
                          className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-all duration-200"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <input
                      type="file"
                      id="portfolio-images"
                      ref={portfolioImagesRef}
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePortfolioImagesChange}
                    />
                    <button
                      type="button"
                      onClick={() => portfolioImagesRef.current.click()}
                      className="px-6 py-3 bg-white text-black border-2 border-black rounded-full font-medium hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1"
                    >
                      Add Portfolio Images
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/stylist-home")}
                  className="px-6 py-3 bg-white text-black border-2 border-black rounded-full font-medium hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1"
                >
                  Cancel
                </button>
              </div>

              {/* Messages */}
              <div className="mt-6">
                {error && (
                  <div className="p-3 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-3 bg-green-100 text-green-700 rounded">
                    {success}
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StylistProfileEdit;
