import React from 'react';

interface Stylist {
  stylist_ID: string;
  FN: string;
  LN: string;
  rating?: number;
}

const StylistCard: React.FC<{ stylist: Stylist }> = ({ stylist }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 text-center hover:shadow-lg transition">
      <img
        src={`https://api.example.com/image/${stylist.stylist_ID}`}
        alt={`${stylist.FN} ${stylist.LN}`}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold">{stylist.FN} {stylist.LN}</h3>
      <p className="text-yellow-500">⭐ {stylist.rating || 'N/A'}</p>
    </div>
  );
};

export default StylistCard;
