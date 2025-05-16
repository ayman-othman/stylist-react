// utils.js
export const checkAuth = () => {
  const userJson = localStorage.getItem("user");
  const stylistJson = localStorage.getItem("styledStylist");

  if (userJson) return { type: "user", data: JSON.parse(userJson) };
  if (stylistJson) return { type: "stylist", data: JSON.parse(stylistJson) };
  return null;
};

export const API_BASE_URL = "http://localhost:3000/api";
