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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {}
          <Route path={PAGES_ROUTE.ABOUT} element={<About/>}/>
          <Route path={PAGES_ROUTE.LOGIN} element={<Login />} />
          <Route path={PAGES_ROUTE.SIGNUP} element={<SignupPage />} />
          <Route path={PAGES_ROUTE.FIND_STYLISTS} element={<FindStylist />} />
          <Route
            path={PAGES_ROUTE.OUTFIT_INSPIRATIONS}
            element={<OutfitInspiration />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
