import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carIcon from '../assets/lorry-removebg-preview.png'; // Replace with actual lorry image path
// import roadImage from './road_design.png'; // Replace with actual road image path

const CarRoadAnimation = () => {
  const [move, setMove] = useState(false);
  const navigate = useNavigate();

  const handleMove = () => {
    if (!move) {
      setMove(true);
      setTimeout(() => {
        navigate('/directions');
      }, 4000); // Match this with animation duration
    }
  };

  return (
    <div className="relative w-full max-w-screen overflow-hidden mt-6 px-4">
      {/* Road background */}
      <div className="relative w-full h-24 bg-black overflow-hidden">
        {/* Center dashed white line */}
        <div className="absolute top-1/2 left-0 w-full border-t-4 border-dashed border-white transform -translate-y-1/2" />

        {/* Car Image */}
        <img
          src={carIcon}
          alt="Lorry"
          onClick={handleMove}
          className={`absolute top-4 h-16 sm:h-20 transition-transform duration-[4s] ease-in-out ${
            move ? 'translate-x-[70vw]' : ''
          }`}
          style={{ left: '1rem', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default CarRoadAnimation;
