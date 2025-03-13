

import React, { useState } from "react";

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    dates: "",
    description: "",
    sections: [],
    sectionTitle: "",
    sectionContent: "",
  });
  const logoutButtonStyle = {
    marginLeft: "20px",
    padding: "8px 15px",
    background: "#ff4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease-in-out"
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSection = () => {
    if (formData.sectionTitle && formData.sectionContent) {
      setFormData({
        ...formData,
        sections: [
          ...formData.sections,
          { title: formData.sectionTitle, content: formData.sectionContent },
        ],
        sectionTitle: "",
        sectionContent: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar Form */}
      <div className="w-1/3 bg-white p-6 shadow-xl border-r border-gray-300 min-h-screen">
        <h2 className="text-xl font-bold mb-4 text-gray-800">ADD INFORMATION</h2>
        
        {/* Form Fields */}
        <input
          type="text"
          name="title"
          placeholder="Enter title..."
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="dates"
          placeholder="Enter date(s)..."
          value={formData.dates}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="description"
          placeholder="Enter a general description..."
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Section Input */}
        <h3 className="font-semibold mt-6 text-gray-700">New Section</h3>
        <input
          type="text"
          name="sectionTitle"
          placeholder="Enter section title..."
          value={formData.sectionTitle}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea
          name="sectionContent"
          placeholder="Enter section content..."
          value={formData.sectionContent}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Buttons */}
        <div className="flex space-x-4">
        <button style={logoutButtonStyle} 
  onClick={addSection}
  className="w-full bg-red-500 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-red-700 transition duration-300"
>
  ➕ ADD SECTION
</button>


                    
          <button style={logoutButtonStyle} 
            onClick={handleSubmit}
            className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition duration-300"
          >
            ✅ SUBMIT
          </button>
        </div>
      </div>

      {/* Right Section Placeholder */}
      <div className="w-2/3 bg-gray-100"></div>
    </div>
  );
};

export default AddPost;
