

import React, { useState } from 'react';
import axios from 'axios';
import Services from './Services';

const WorkerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    degree: '',
    marks10: '',
    marks12: '',
    aadhar: '',
    contact: '',
    address: '',
    profession: '', // Profession field
    image: null,
  });

  const [suggestions, setSuggestions] = useState([]); // State for profession suggestions
  const professions = [
    'Baby Sitter',
    'Dog Sitter',
    'Plant Sitter',
    'Tutor',
    'Content Writer',
    'Personal Chef',
    'Data Entry',
    'Caretaker',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Show suggestions based on user input
    if (name === 'profession') {
      const filteredSuggestions = professions.filter((profession) =>
        profession.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (profession) => {
    setFormData({ ...formData, profession });
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('https://eliteworkers.netlify.app/api/workers', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Worker created:', response.data);
      alert('Worker details submitted successfully!');
    } catch (error) {
      console.error('Error submitting worker details:', error);
      alert('Failed to submit worker details.');
    }
  };

  return (
    <>
      <Services />
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-blue-50 to-purple-50">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 lg:p-8 space-y-6">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-center text-gray-900">Worker Details Form</h2>
            <div className="space-y-4">
              {/* Form fields */}
              {[
                { label: 'Name', type: 'text', name: 'name', placeholder: 'Enter your name' },
                { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email' },
                { label: 'Degree', type: 'text', name: 'degree', placeholder: 'Enter your degree' },
                { label: '10th Marks', type: 'number', name: 'marks10', placeholder: 'Enter your 10th marks' },
                { label: '12th Marks', type: 'number', name: 'marks12', placeholder: 'Enter your 12th marks' },
                { label: 'Aadhar Number', type: 'text', name: 'aadhar', placeholder: 'Enter your Aadhar number' },
                { label: 'Contact Number', type: 'text', name: 'contact', placeholder: 'Enter your contact number' },
                { label: 'Address', type: 'text', name: 'address', placeholder: 'Enter your address' },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}

              {/* Profession Field with Suggestions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Profession</label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Enter your profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {suggestions.length > 0 && (
                  <div className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                    {suggestions.map((profession, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(profession)}
                        className="p-2 hover:bg-blue-50 cursor-pointer"
                      >
                        {profession}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-400 text-white py-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side: Preview or Image */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8 flex items-center justify-center bg-amber-500">
          <div className="text-center text-white">
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-4">Welcome to Elite Crew</h2>
            <p className="text-lg">Fill out the form to join our team of talented professionals.</p>
            {formData.image && (
              <div className="mt-8">
                <h3 className="text-xl lg:text-2xl font-bold mb-4">Image Preview</h3>
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-48 h-48 lg:w-64 lg:h-64 object-cover rounded-lg shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerForm;