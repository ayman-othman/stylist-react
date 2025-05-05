function Footer() {
  return (
    <footer className="bg-black text-white px-[5%] pt-16 pb-5">
      {/* Top Section */}
      <div className="flex flex-wrap justify-between gap-10 mb-10">
        {/* Logo & Description */}
        <div className="max-w-xs">
          <h3 className="text-2xl mb-4">Styled</h3>
          <p className="text-gray-300">
            Your premier platform for connecting with professional stylists
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg mb-5">Quick Links</h4>
          <ul>
            <li className="mb-2">
              <a href="index.html" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="find-stylists.html" className="hover:text-gray-300">
                Find Stylists
              </a>
            </li>
            <li className="mb-2">
              <a
                href="outfit-inspirations.html"
                className="hover:text-gray-300"
              >
                Outfit Inspirations
              </a>
            </li>
            <li className="mb-2">
              <a href="about.html" className="hover:text-gray-300">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg mb-5">Contact Us</h4>
          <p className="text-gray-300 mb-2">Email: Styled@gmail.com</p>
          <p className="text-gray-300 mb-2">Phone: 01123456789</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-xl">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 pt-5 text-center text-gray-500">
        <p>&copy; 2025 Styled. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
