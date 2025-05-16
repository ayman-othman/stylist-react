import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { PAGES_ROUTE } from "./models/constant/pages-route";
import Layout from "./pages/layout/layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import FindStylist from "./pages/find-stylists/find-stylist";
import OutfitInspiration from "./pages/outfit-inspirations/outfit-inspirations";
import { SignupPage } from "./pages/sign-up/sign-up";
import About from "./pages/about/about";
import StylistProfile from "./pages/stylist-profile/stylist-profile";
import { AuthProvider } from "./components/PrivateRoutes/PrivateRoute";
import StylistProfileEdit from "./pages/stylist-profile-edit/stylist-profile-edit";
import StylistDashboard from "./pages/stylist-dashboard/stylist-dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {}
            <Route path={PAGES_ROUTE.ABOUT} element={<About />} />
            <Route path={PAGES_ROUTE.LOGIN} element={<Login />} />
            <Route path={PAGES_ROUTE.SIGNUP} element={<SignupPage />} />
            <Route path={PAGES_ROUTE.FIND_STYLISTS} element={<FindStylist />} />
            <Route
              path={PAGES_ROUTE.OUTFIT_INSPIRATIONS}
              element={<OutfitInspiration />}
            />
            {/* Protected Routes */}
            <Route
              path={PAGES_ROUTE.STYLIST_DASHBOARD}
              element={<StylistDashboard />}
            />
            <Route
              path={PAGES_ROUTE.STYLIST_PROFILE}
              element={<StylistProfile />}
            />
            <Route
              path={PAGES_ROUTE.STYLIST_PROFILE_EDIT}
              element={<StylistProfileEdit />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
