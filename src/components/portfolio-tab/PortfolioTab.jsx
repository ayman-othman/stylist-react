const PortfolioTab = ({ portfolio }) => {
  if (!portfolio || portfolio.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No portfolio items available
      </div>
    );
  }

  // Group by category
  const categorized = portfolio.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="px-5 pb-16">
      {Object.entries(categorized).map(([category, items]) => (
        <div key={category} className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="font-serif text-3xl mb-2">{category}</h3>
            <p className="text-gray-600">{items[0].description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.image_url}
                  alt={`Portfolio - ${category}`}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioTab;
