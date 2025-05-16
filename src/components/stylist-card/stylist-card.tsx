import React from "react";
import { Link } from "react-router-dom";
import { IStylist } from "../../models/interfaces/interfaces";

const StylistCard: React.FC<{ stylist: IStylist }> = ({ stylist }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 text-center hover:shadow-lg transition">
      <img
        src={`/${stylist.image_url}`}
        alt={`${stylist.FN} ${stylist.LN}`}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold">
        {stylist.FN} {stylist.LN}
      </h3>
      <p className="text-yellow-500">⭐ {stylist.rating || "N/A"}</p>
      <Link
        to={{
          pathname: `/stylist-profile`,
          search: `?id=${stylist.stylist_ID}`,
        }}
      >
        <button className="px-3 py-2 my-3 bg-black text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-800 text-nowrap">
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default StylistCard;
