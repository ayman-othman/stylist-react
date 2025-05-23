import React, { useEffect, useState } from "react";
import {
  fetchStylists,
  fetchStylistSpecializations,
} from "../../services/find-stylist/find-stylist.service";
import debounce from "../../utils/debounce/debounce";
import StylistCard from "../../components/stylist-card/stylist-card";
import { IStylist } from "../../models/interfaces/interfaces";

const FindStylist: React.FC = () => {
  const [stylists, setStylists] = useState<IStylist[]>([]);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [specialization, setSpecialization] = useState(0);

  useEffect(() => {
    loadStylists();
  }, [search, rating, specialization]);

  const loadStylists = debounce(async () => {
    try {
      const data = await fetchStylists();
      console.log(data);
      let filtered = data;
      console.log(search);
      if (search) {
        filtered = filtered.filter(
          (s: { FN: string; LN: string }) =>
            s.FN.toLowerCase().includes(search.toLowerCase()) ||
            s.LN.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (rating) {
        filtered = filtered.filter(
          (s: { rating: any }) => (s.rating ?? 0) >= parseInt(rating)
        );
      }

      let filteredWithSpecs: any | [] = null;
      if (specialization == 0) {
        filteredWithSpecs = data;
      } else {
        filteredWithSpecs = data.filter(
          (person: any) => person?.stylist_ID == specialization
        );
      }
      setStylists(filteredWithSpecs);
    } catch (err) {
      console.error("Failed to load stylists", err);
    }
  }, 300);

  return (
    <section className="px-5 py-16 bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-10">Find Your Stylist</h1>
      <div className="max-w-4xl mx-auto mb-10 space-y-4">
        <input
          type="text"
          placeholder="Search stylists..."
          className="w-full px-5 py-3 rounded-full shadow"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-4 justify-center">
          <select
            className="w-60 px-4 py-2 rounded-full border"
            onChange={(e: any) => setSpecialization(e.target.value)}
          >
            <option value={0}>All Specializations</option>
            <option value={3}>Casual Wear</option>
            <option value={2}>Luxury Fashion</option>
            <option value={2}>Bridal</option>
            <option value={24}>Corporate</option>
            <option value={5}>Modest Fashion</option>
            <option value={5}>Hijabi Wear</option>
            {/* <option value={}>Gala Events</option> */}
            <option value={3}>Street Wear</option>
          </select>
          <select
            className="w-60 px-4 py-2 rounded-full border"
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Star</option>
          </select>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5">
        {stylists.length > 0 ? (
          stylists.map((stylist) => (
            <StylistCard key={stylist.stylist_ID} stylist={stylist} />
          ))
        ) : (
          <p className="col-span-full text-gray-600">
            No stylists match your filters.
          </p>
        )}
      </section>
    </section>
  );
};

export default FindStylist;
