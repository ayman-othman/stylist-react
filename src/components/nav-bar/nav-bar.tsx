import { Link } from "react-router-dom";
import "./nav-bar.scss";
import { PAGES_ROUTE } from "../../models/constant/pages-route";
import { useAuth } from "../PrivateRoutes/PrivateRoute";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = (): any => {
    localStorage.removeItem("styledUser");
    setIsAuthenticated(false);
  };

  return (
    <nav className="flex items-center justify-between px-[5%] py-5 bg-white shadow-md sticky top-0 z-[1000]">
      {/* Logo */}
      <div className="relative text-[2.4rem] font-normal tracking-wide font-dancing text-black">
        <Link to="/" className="relative px-0">
          Styled
          <span className="absolute top-[-5px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black to-transparent"></span>
          <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black to-transparent"></span>
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-8 justify-center w-full">
        <li>
          <Link
            to="/"
            className="relative pb-1 hover:font-bold hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/" + PAGES_ROUTE.FIND_STYLISTS}
            className="relative pb-1 hover:font-bold hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
          >
            Find Stylists
          </Link>
        </li>
        <li>
          <Link
            to={"/" + PAGES_ROUTE.OUTFIT_INSPIRATIONS}
            className="relative pb-1 hover:font-bold hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
          >
            Outfit Inspirations
          </Link>
        </li>
        <li>
          <Link
            to={"/" + PAGES_ROUTE.ABOUT}
            className="relative pb-1 hover:font-bold hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
          >
            About
          </Link>
        </li>
      </ul>

      {/* Auth Buttons */}

      {!isAuthenticated ? (
        <div className="flex gap-4 items-center">
          <Link
            to={"/" + PAGES_ROUTE.LOGIN}
            className="px-6 py-2 border border-black rounded-full font-medium transition-all duration-300 hover:bg-gray-100 text-nowrap"
          >
            Login
          </Link>

          <Link
            to={"/" + PAGES_ROUTE.SIGNUP}
            className="px-6 py-2 bg-black text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-800 text-nowrap"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 items-center" onClick={handleLogout}>
          <button className="px-6 py-2 border border-black rounded-full font-medium transition-all duration-300 hover:bg-red-500 hover:text-white text-nowrap">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
