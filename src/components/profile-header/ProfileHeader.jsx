const ProfileHeader = ({
  stylist,
  specializations,
  generateStarRating,
  onBookClick,
}) => {
  return (
    <section className="bg-gray-100 py-16 px-5 text-center">
      <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-5">
        <img
          src={"/" + stylist?.image_url || "/default-profile.jpg"}
          alt="Stylist Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold mb-2">
        {stylist.FN} {stylist.LN}
      </h1>

      <div className="text-yellow-400 text-xl mb-4">
        {generateStarRating(stylist.rating || 0)}
        <span className="text-black ml-2">({stylist.rating || 0})</span>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {specializations.map((spec, index) => (
          <div key={index} className="px-4 py-1 bg-gray-200 rounded-full">
            {spec}
          </div>
        ))}
      </div>

      <button
        onClick={onBookClick}
        className="px-8 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
      >
        Book Appointment
      </button>
    </section>
  );
};

export default ProfileHeader;
