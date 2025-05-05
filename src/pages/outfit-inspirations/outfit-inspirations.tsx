import { useState } from "react";
import axios from "axios";

interface IOutfit {
  id: number;
  category: string;
  image: string;
  alt: string;
  isFavorite: boolean;
}

const sampleOutfits: IOutfit[] = [
    { id: 1, category: 'formal', image: '/images/formal-outfits/formal3.jpeg', alt: 'Business Attire', isFavorite: false },
    { id: 2, category: 'casual', image: '/images/casual-outfits/casual3.jpeg', alt: 'Weekend Outfit', isFavorite: false },
    { id: 3, category: 'Bridal', image: '/images/Bridal-outfits/bridal2.jpeg', alt: 'Bridal Outfit', isFavorite: false },
    { id: 4, category: 'streetwear', image: '/images/streetwear-outfits/street1.jpeg', alt: 'Street Outfit', isFavorite: false },
    { id: 5, category: 'Bridal', image: '/images/Bridal-outfits/bridal5.jpeg', alt: 'Bridal Outfit', isFavorite: false },
    { id: 6, category: 'casual', image: '/images/casual-outfits/casual1.jpeg', alt: 'Casual Summer Look', isFavorite: false },
    { id: 7, category: 'streetwear', image: '/images/streetwear-outfits/street4.jpeg', alt: 'Street Outfit', isFavorite: false },
    { id: 8, category: 'formal', image: '/images/formal-outfits/formal1.jpeg', alt: 'Business Attire', isFavorite: false },
    { id: 9, category: 'Bridal', image: '/images/Bridal-outfits/bridal6.jpeg', alt: 'Bridal Outfit', isFavorite: false },
    { id: 10, category: 'streetwear', image: '/images/streetwear-outfits/street2.jpeg', alt: 'Street Outfit', isFavorite: false },
    { id: 11, category: 'casual', image: '/images/casual-outfits/casual4.jpeg', alt: 'Weekend Outfit', isFavorite: false },
    { id: 12, category: 'formal', image: '/images/formal-outfits/formal5.jpeg', alt: 'Business Attire', isFavorite: false },
    { id: 13, category: 'Bridal', image: '/images/Bridal-outfits/bridal1.jpeg', alt: 'Bridal Outfit', isFavorite: false },
    { id: 14, category: 'streetwear', image: '/images/streetwear-outfits/street5.jpeg', alt: 'Street Outfit', isFavorite: false },
    { id: 15, category: 'casual', image: '/images/casual-outfits/casual5.jpeg', alt: 'Weekend Outfit', isFavorite: false },
    { id: 16, category: 'formal', image: '/images/formal-outfits/formal2.jpeg', alt: 'Business Attire', isFavorite: false },
    { id: 17, category: 'Bridal', image: '/images/Bridal-outfits/bridal3.jpeg', alt: 'Bridal Outfit', isFavorite: false },
    { id: 18, category: 'streetwear', image: '/images/streetwear-outfits/street3.jpeg', alt: 'Street Outfit', isFavorite: false },
    { id: 19, category: 'casual', image: '/images/casual-outfits/casual2.jpeg', alt: 'Weekend Outfit', isFavorite: false },
    { id: 20, category: 'formal', image: '/images/formal-outfits/formal4.jpeg', alt: 'Business Attire', isFavorite: false },
    { id: 21, category: 'Bridal', image: '/images/Bridal-outfits/bridal4.jpeg', alt: 'Bridal Outfit', isFavorite: false },
  ];
  

const OutfitInspiration = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [outfits, setOutfits] = useState<IOutfit[]>(sampleOutfits);

  const toggleFavorite = (id: number) => {
    setOutfits((prev) =>
      prev.map((outfit) =>
        outfit.id === id
          ? { ...outfit, isFavorite: !outfit.isFavorite }
          : outfit
      )
    );
    axios.post("/api/favorite", { outfitId: id }).catch(console.error);
  };

  const filteredOutfits =
    selectedCategory === "all"
      ? outfits
      : outfits.filter((outfit) => outfit.category === selectedCategory);

  const categories = ["all", "casual", "formal", "streetwear", "Bridal"];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="text-center py-12 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Choose Your Style</h1>
        <div className="flex justify-center flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full border border-black transition-colors ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Outfits Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-12">
        {filteredOutfits.map((outfit) => (
          <div
            key={outfit.id}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={outfit.image}
              alt={outfit.alt}
              className="w-full h-[650px] object-cover transition-transform duration-300 hover:scale-105"
            />
            <div
              onClick={() => toggleFavorite(outfit.id)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors"
            >
              <i
                className={`text-xl ${
                  outfit.isFavorite
                    ? "fas fa-heart text-red-500"
                    : "far fa-heart"
                }`}
              />
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Style?
        </h2>
        <p className="mb-6">
          Join Styled today and connect with professional stylists who can help
          you look and feel your best.
        </p>
        <a
          href="/signup"
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Get Started Now
        </a>
      </section>
    </div>
  );
};

export default OutfitInspiration;
