import "./nav-bar.scss";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-[5%] py-5 bg-white shadow-md sticky top-0 z-[1000]">
      {/* Logo */}
      <div className="relative text-[2.4rem] font-normal tracking-wide font-dancing text-black">
        <a href="index.html" className="relative px-0">
          Styled
          <span className="absolute top-[-5px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black to-transparent"></span>
          <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black to-transparent"></span>
        </a>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-8 justify-center w-full">
        <li>
          <a
            href="index.html"
            className="relative pb-1 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="find-stylists.html"
            className="relative pb-1 hover:font-bold hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
          >
            Find Stylists
          </a>
        </li>
        <li>
          <a
            href="outfit-inspirations.html"
            className="relative pb-1 hover:font-bold hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
          >
            Outfit Inspirations
          </a>
        </li>
        <li>
          <a
            href="about.html"
            className="relative pb-1 hover:font-bold hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
          >
            About
          </a>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-4 items-center">
        <a
          href="login.html"
          className="px-6 py-2 border border-black rounded-full font-medium transition-all duration-300 hover:bg-gray-100 text-nowrap"
        >
          Login
        </a>
        <a
          href="signup.html"
          className="px-6 py-2 bg-black text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-800 text-nowrap"
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
