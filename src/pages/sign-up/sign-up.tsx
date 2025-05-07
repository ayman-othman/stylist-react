import { useFormik } from "formik";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

const API_BASE_URL = "http://localhost:3500/api"; // Replace with your actual API base

export const SignupPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSetQueryParam = (type: any) => {
    setSearchParams({ type });
  };
  const navigate = useNavigate();
  const type = searchParams.get("type"); // no default — let it be null
  const isStylist = type === "stylist";
  const isUser = type === "user";
  const [error, setError] = useState("");

  // ---------------------- FORM SETUP ----------------------
  const formik = useFormik({
    initialValues: isStylist
      ? {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          specializations: [] as string[],
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dob: "",
          height: "",
          weight: "",
          address: "",
          password: "",
          confirmPassword: "",
        },
    enableReinitialize: true,
    validationSchema: Yup.object(
      isStylist
        ? {
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string()
              .min(8, "Min 8 characters")
              .required("Required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Required"),
            specializations: Yup.array().min(1, "Select at least one"),
          }
        : {
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            phone: Yup.string(),
            dob: Yup.string(),
            height: Yup.number(),
            weight: Yup.number(),
            address: Yup.string(),
            password: Yup.string()
              .min(8, "Min 8 characters")
              .required("Required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Required"),
          }
    ),
    onSubmit: async (values) => {
      try {
        setError("");
        if (isStylist) {
          const stylistRes = await axios.post(`${API_BASE_URL}/stylist`, {
            FN: values.firstName,
            LN: values.lastName,
            email: values.email,
            password: values.password,
          });

          if (stylistRes.data.Status === "OK") {
            const stylistId = stylistRes.data.Message.split(" ").pop();
            await Promise.all(
              values.specializations!.map((spec: string) =>
                axios.post(`${API_BASE_URL}/stylist_specialization`, {
                  stylist_ID: stylistId,
                  specialization: spec,
                })
              )
            );

            navigate("/login");
          } else {
            throw new Error(stylistRes.data.Message);
          }
        } else if (isUser) {
          const userRes = await axios.post(`${API_BASE_URL}/user`, {
            FN: values.firstName,
            LN: values.lastName,
            email: values.email,
            phone: values.phone,
            dob: values.dob,
            height: values.height,
            weight: values.weight,
            Address: values.address,
            Password: values.password,
          });

          if (userRes.data.Status === "OK") {
            alert("User registered!");
            navigate("/login");
          } else {
            throw new Error(userRes.data.Message);
          }
        }
      } catch (err: any) {
        setError(err.message || "Registration failed.");
      }
    },
  });

  // ---------------------- NO TYPE? SHOW OPTIONS ----------------------
  if (!type) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Join Styled</h2>
        <p className="mb-6">Choose your account type to get started:</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSetQueryParam("user")}
            className="px-6 py-2 bg-black text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-800 text-nowrap"
          >
            I'm Looking for a Stylist
          </button>
          <button
            onClick={() => onSetQueryParam("stylist")}
            className="px-6 py-2 bg-black text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-800 text-nowrap"
          >
            I'm a Stylist
          </button>
        </div>
        <div className="mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </div>
      </div>
    );
  }

  // ---------------------- FORM RENDER ----------------------
  return (
    <div className="max-w-xl mx-auto mt-20 p-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        {isStylist ? "Create Stylist Account" : "Create User Account"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Common Fields */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-800 text-left">
              First Name *
            </label>
            <input
              {...formik.getFieldProps("firstName")}
              className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm mt-1 text-left">
                {formik.errors.firstName}
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-800 text-left">
              Last Name *
            </label>
            <input
              {...formik.getFieldProps("lastName")}
              className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-sm mt-1 text-left">
                {formik.errors.lastName}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-800 text-left">
            Email *
          </label>
          <input
            {...formik.getFieldProps("email")}
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-black"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1 text-left">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* User Specific Fields */}
        {isUser && (
          <>
            <div>
              <label className="block mb-2 font-medium text-gray-800 text-left">
                Phone
              </label>
              <input
                {...formik.getFieldProps("phone")}
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-800 text-left">
                  DOB
                </label>
                <input
                  {...formik.getFieldProps("dob")}
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-md text-base"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-800 text-left">
                  Height (cm)
                </label>
                <input
                  {...formik.getFieldProps("height")}
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md text-base"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-800 text-left">
                  Weight (kg)
                </label>
                <input
                  {...formik.getFieldProps("weight")}
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md text-base"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-800 text-left">
                Address
              </label>
              <input
                {...formik.getFieldProps("address")}
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>
          </>
        )}

        {/* Stylist Specific Fields */}
        {isStylist && (
          <div>
            <label className="block mb-2 font-medium text-gray-800 text-left">
              Specializations *
            </label>
            <select
              multiple
              value={formik.values.specializations}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(
                  (o) => o.value
                );
                formik.setFieldValue("specializations", selected);
              }}
              className="w-full h-32 p-3 border border-gray-300 rounded-md text-base"
            >
              <option value="casual">Casual Wear</option>
              <option value="luxury">Luxury Fashion</option>
              <option value="bridal">Bridal</option>
              <option value="corporate">Corporate</option>
              <option value="modest">Modest Fashion</option>
              <option value="hijabi">Hijabi Wear</option>
              <option value="gala">Gala Events</option>
              <option value="streetwear">Streetwear</option>
            </select>
            {formik.touched.specializations &&
              formik.errors.specializations && (
                <div className="text-red-500 text-sm mt-1 text-left">
                  {formik.errors.specializations}
                </div>
              )}
          </div>
        )}

        {/* Password Fields */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-800 text-left">
              Password *
            </label>
            <input
              {...formik.getFieldProps("password")}
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md text-base"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1 text-left">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-800 text-left">
              Confirm Password *
            </label>
            <input
              {...formik.getFieldProps("confirmPassword")}
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md text-base"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1 text-left">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
        </div>

        {/* Error message */}
        {error && <div className="text-red-600 text-left">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-all"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};
