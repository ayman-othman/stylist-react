import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/PrivateRoutes/PrivateRoute";
import { PAGES_ROUTE } from "../../models/constant/pages-route";

const API_BASE_URL = "http://localhost:3500/api"; // Replace with your actual API

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"user" | "stylist">("user");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const endpoint = userType === "user" ? "user/login" : "stylist/login";
    const requestBody =
      userType === "user"
        ? { email, Password: password } // Capital P for user
        : { email, password }; // lowercase p for stylist

    try {
      const response = await axios.post(
        `${API_BASE_URL}/${endpoint}`,
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      if (data.Status === "OK") {
        localStorage.setItem(
          "user",
          JSON.stringify(data?.user || data?.stylist)
        );
        setIsAuthenticated(true);
        if (userType === "user") {
          navigate("/");
        } else {
          navigate(`/${PAGES_ROUTE.STYLIST_DASHBOARD}`);
        }
      } else {
        setErrorMessage(data.Message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const message =
          error.response.data.Message ||
          (error.response.status === 401
            ? "Invalid email or password"
            : `Server error (${error.response.status}). Please try again later.`);
        setErrorMessage(message);
      } else {
        console.error("Login error:", error);
        setErrorMessage(
          "Connection error. Please check your internet connection."
        );
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl mb-8 text-center font-semibold">Welcome Back</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">I am a:</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="user-type"
                value="user"
                checked={userType === "user"}
                onChange={() => setUserType("user")}
              />
              User
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="user-type"
                value="stylist"
                checked={userType === "stylist"}
                onChange={() => setUserType("stylist")}
              />
              Stylist
            </label>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          Login
        </button>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Don't have an account?{" "}
            <a
              href="signup.html"
              className="text-black font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
