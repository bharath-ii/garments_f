import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ImRocket } from "react-icons/im";

const ExploreUs = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/machines')
      .then(res => setMachines(res.data))
      .catch(err => {
        console.error('Error fetching machines:', err);
      });
  }, []);

  return (
    <div className="px-4 sm:px-6 py-6">
     <h2 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-8 flex justify-center items-center gap-2">
  Explore Our Machines<ImRocket />
  
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {machines.map(machine => (
          <div
            key={machine.id}
            className="bg-white shadow-md p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl active:scale-100 cursor-pointer"
          >
            <img
              src={machine.imageUrl}
              alt={machine.title}
              className="w-full h-48 sm:h-52 object-cover mb-3 transition duration-300"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{machine.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{machine.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreUs;
