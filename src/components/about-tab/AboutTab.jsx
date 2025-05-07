const AboutTab = ({ stylist }) => {
  return (
    <div className="px-5 pb-16 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4">About Me</h3>
      <p className="mb-6">{stylist.about || "No information available."}</p>

      <h3 className="text-xl font-bold mb-4 mt-8">Education & Experience</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Fashion Institute of Design - Styling Certificate</li>
        <li>Former personal stylist at Nordstrom</li>
        <li>Editorial styling for local fashion magazines</li>
        <li>Celebrity styling for red carpet events</li>
      </ul>
    </div>
  );
};

export default AboutTab;
