

// import React, { useState } from 'react';
// import axios from 'axios';
// import Services from './Services';

// const WorkerForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     degree: '',
//     marks10: '',
//     marks12: '',
//     aadhar: '',
//     contact: '',
//     address: '',
//     profession: '', // Profession field
//     image: null,
//   });

//   const [suggestions, setSuggestions] = useState([]); // State for profession suggestions
//   const professions = [
//     'Baby Sitter',
//     'Dog Sitter',
//     'Plant Sitter',
//     'Tutor',
//     'Content Writer',
//     'Personal Chef',
//     'Data Entry',
//     'Caretaker',
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Show suggestions based on user input
//     if (name === 'profession') {
//       const filteredSuggestions = professions.filter((profession) =>
//         profession.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     }
//   };

//   const handleSuggestionClick = (profession) => {
//     setFormData({ ...formData, profession });
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post('https://elitecrewworker.onrender.com/api/workers', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Worker created:', response.data);
//       alert('Worker details submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting worker details:', error);
//       alert('Failed to submit worker details.');
//     }
//   };

//   return (
//     <>
//       <Services />
//       <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-blue-50 to-purple-50">
//         {/* Left Side: Form */}
//         <div className="w-full lg:w-1/2 p-4 lg:p-8 flex items-center justify-center">
//           <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 lg:p-8 space-y-6">
//             <h2 className="text-2xl lg:text-3xl font-extrabold text-center text-gray-900">Worker Details Form</h2>
//             <div className="space-y-4">
//               {/* Form fields */}
//               {[
//                 { label: 'Name', type: 'text', name: 'name', placeholder: 'Enter your name' },
//                 { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email' },
//                 { label: 'Degree', type: 'text', name: 'degree', placeholder: 'Enter your degree' },
//                 { label: '10th Marks', type: 'number', name: 'marks10', placeholder: 'Enter your 10th marks' },
//                 { label: '12th Marks', type: 'number', name: 'marks12', placeholder: 'Enter your 12th marks' },
//                 { label: 'Aadhar Number', type: 'text', name: 'aadhar', placeholder: 'Enter your Aadhar number' },
//                 { label: 'Contact Number', type: 'text', name: 'contact', placeholder: 'Enter your contact number' },
//                 { label: 'Address', type: 'text', name: 'address', placeholder: 'Enter your address' },
//               ].map((field, index) => (
//                 <div key={index}>
//                   <label className="block text-sm font-medium text-gray-700">{field.label}</label>
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     placeholder={field.placeholder}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               ))}

//               {/* Profession Field with Suggestions */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Profession</label>
//                 <input
//                   type="text"
//                   name="profession"
//                   placeholder="Enter your profession"
//                   value={formData.profession}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {suggestions.length > 0 && (
//                   <div className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
//                     {suggestions.map((profession, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handleSuggestionClick(profession)}
//                         className="p-2 hover:bg-blue-50 cursor-pointer"
//                       >
//                         {profession}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Upload Image</label>
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={handleImageChange}
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-amber-400 text-white py-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Submit
//             </button>
//           </form>
//         </div>

//         {/* Right Side: Preview or Image */}
//         <div className="w-full lg:w-1/2 p-4 lg:p-8 flex items-center justify-center bg-amber-500">
//           <div className="text-center text-white">
//             <h2 className="text-2xl lg:text-4xl font-extrabold mb-4">Welcome to Elite Crew</h2>
//             <p className="text-lg">Fill out the form to join our team of talented professionals.</p>
//             {formData.image && (
//               <div className="mt-8">
//                 <h3 className="text-xl lg:text-2xl font-bold mb-4">Image Preview</h3>
//                 <img
//                   src={URL.createObjectURL(formData.image)}
//                   alt="Preview"
//                   className="w-48 h-48 lg:w-64 lg:h-64 object-cover rounded-lg shadow-2xl"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WorkerForm;

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
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
    profession: '',
    image: null,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

    if (name === 'profession') {
      const filteredSuggestions = professions.filter((profession) =>
        profession.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (profession) => {
    setFormData({ ...formData, profession });
    setSuggestions([]);
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post('https://elitecrewworker.onrender.com/api/workers', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting worker details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Services />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl">
            {/* Form Section */}
            <motion.div 
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="w-full lg:w-1/2 bg-white p-8 lg:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.h2 
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl font-extrabold text-center text-gray-900 mb-2"
                >
                  Join Our <span className="text-amber-500">Elite Team</span>
                </motion.h2>
                <p className="text-center text-gray-600 mb-8">Fill out the form to start your journey with us</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', type: 'text', name: 'name', placeholder: 'John Doe' },
                    { label: 'Email', type: 'email', name: 'email', placeholder: 'john@example.com' },
                    { label: 'Highest Degree', type: 'text', name: 'degree', placeholder: 'B.Tech, MBA, etc.' },
                    { label: '10th Marks (%)', type: 'number', name: 'marks10', placeholder: '85' },
                    { label: '12th Marks (%)', type: 'number', name: 'marks12', placeholder: '80' },
                    { label: 'Aadhar Number', type: 'text', name: 'aadhar', placeholder: '1234 5678 9012' },
                    { label: 'Contact Number', type: 'tel', name: 'contact', placeholder: '+91 9876543210' },
                  ].map((field, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your complete address"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="profession"
                      placeholder="Select your profession"
                      value={formData.profession}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {suggestions.map((profession, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(profession)}
                            className="p-3 hover:bg-amber-50 cursor-pointer transition-colors duration-200"
                          >
                            {profession}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-amber-500 hover:bg-amber-50 rounded-lg cursor-pointer transition-all duration-300">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-600">
                          {formData.image ? formData.image.name : 'Upload a photo'}
                        </p>
                      </div>
                      <input type="file" className="opacity-0" onChange={handleImageChange} />
                    </label>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </motion.div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-green-100 text-green-800 rounded-lg text-center"
                  >
                    Application submitted successfully! We'll contact you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Preview Section */}
            <motion.div 
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="w-full lg:w-1/2 bg-gradient-to-br from-amber-500 to-amber-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl font-extrabold mb-4">Why Join Elite Crew?</h2>
                <p className="text-xl opacity-90">Be part of a community that values your skills and professionalism</p>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="w-full max-w-md space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {[
                      'Competitive pay rates',
                      'Flexible working hours',
                      'Professional development',
                      'Supportive community',
                      'Regular client opportunities'
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {formData.image && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center"
                  >
                    <h3 className="text-xl font-bold mb-4">Profile Preview</h3>
                    <div className="flex justify-center">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default WorkerForm;