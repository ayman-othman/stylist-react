const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "portfolio", label: "Portfolio" },
    { id: "reviews", label: "Reviews" },
    { id: "about", label: "About" },
  ];

  return (
    <div className="flex justify-center border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-8 py-4 font-medium relative ${
            activeTab === tab.id ? "font-bold" : ""
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
