import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      const res = await axios.get('/api/workers');
      setWorkers(res.data);
    };
    fetchWorkers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Worker List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {workers.map((worker) => (
          <div
            key={worker._id}
            className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-3xl"
          >
            <img
              src={`/uploads/${worker.image}`}
              alt={worker.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{worker.name}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Email:</span> {worker.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Degree:</span> {worker.degree}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">10th Marks:</span> {worker.marks10}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">12th Marks:</span> {worker.marks12}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Aadhar:</span> {worker.aadhar}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Contact:</span> {worker.contact}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Address:</span> {worker.address}
              </p>
              {/* Profession Field */}
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Profession:</span> {worker.profession}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerList;