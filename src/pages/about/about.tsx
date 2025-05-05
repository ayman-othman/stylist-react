const About: React.FC = () => {
  return (
    <main>
      {/* Our Story Section */}
      <section className="bg-gray-100 py-20 px-5 flex flex-wrap items-center gap-12">
        <div className="flex-1 min-w-[300px] max-w-xl mx-auto px-5 text-left">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-gray-600 mb-6">
            At Styled, we believe that everyone deserves to feel confident and
            empowered through their personal style. Our journey began with a
            simple vision: to make professional styling services accessible to
            everyone.
          </p>
          <p className="text-lg text-gray-600">
            Founded by a team of fashion enthusiasts and tech innovators, we've
            created a platform that bridges the gap between talented stylists
            and individuals seeking to enhance their personal style.
          </p>
        </div>
        <div className="md:flex-1 max-w-3xl flex justify-center items-center">
          <img
            src="images/3.jpeg"
            alt="Styled Team"
            className="w-full h-[550px] object-cover rounded-lg shadow-2xl"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20 px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600">
            To revolutionize the way people discover and develop their personal
            style by connecting them with professional stylists who understand
            their unique needs and aspirations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div className="p-8 bg-gray-100 rounded-2xl shadow-md">
              <span className="block text-4xl font-bold text-black mb-2">
                100+
              </span>
              <span className="text-gray-600 text-lg">Happy Clients</span>
            </div>
            <div className="p-8 bg-gray-100 rounded-2xl shadow-md">
              <span className="block text-4xl font-bold text-black mb-2">
                20+
              </span>
              <span className="text-gray-600 text-lg">Expert Stylists</span>
            </div>
            <div className="p-8 bg-gray-100 rounded-2xl shadow-md">
              <span className="block text-4xl font-bold text-black mb-2">
                15+
              </span>
              <span className="text-gray-600 text-lg">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 py-20 px-5 text-center">
        <h2 className="text-4xl font-semibold mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "fas fa-heart",
              title: "Passion",
              text: "We're passionate about helping people discover their unique style and boost their confidence.",
            },
            {
              icon: "fas fa-handshake",
              title: "Trust",
              text: "Building trust through transparency and quality service is at the core of everything we do.",
            },
            {
              icon: "fas fa-users",
              title: "Community",
              text: "We foster a supportive community of stylists and clients who inspire each other.",
            },
            {
              icon: "fas fa-lightbulb",
              title: "Innovation",
              text: "We continuously innovate to provide the best experience for our users and stylists.",
            },
          ].map(({ icon, title, text }, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-2xl shadow-md hover:-translate-y-2 transition-transform"
            >
              <i className={`${icon} text-4xl text-black mb-5`}></i>
              <h3 className="text-2xl font-semibold mb-4">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
