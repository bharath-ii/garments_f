import React from 'react';
import CarRoadAnimation from './CarRoadAnimation';

const MahalakshmiGarmentsCard = () => {
  return (
    <div className="min-h-screen bg-[#F89484] text-black font-sans flex flex-col justify-between">
      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 sm:px-6 md:px-10 py-8 md:py-12 gap-6 md:gap-12">
        {/* Left */}
       <div className="space-y-6">
  <p className="text-white text-sm sm:text-base leading-relaxed">
    All Meachines &gt; Trending Styles &gt;
    <br />
    Mahalakshmi Premium Cloth Sticthing
  </p>

  <div className="flex flex-wrap gap-3">
    <span className="bg-white text-black text-sm px-3 py-1.5">
      All Meachines
    </span>
    <span className="bg-white text-black text-sm px-3 py-1.5">
      Any Ages
    </span>
    <span className="bg-white text-black text-sm px-3 py-1.5">
      Salary Assured
    </span>
  </div>

  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
    We Stitches The L🧵ve!
  </h1>

  <p className="text-base md:text-lg leading-relaxed">
    Exclusive new meachines at Mahalakshmi Garments. Stylish, Comfortable & Freedom for Everyone.
  </p>

  <h2 className="text-4xl sm:text-5xl font-bold mt-5 tracking-wide">MAHALAKSHMI</h2>
  <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">GARMENTS</h2>

  <button className="mt-7 bg-white text-black px-6 sm:px-7 py-3 sm:py-4 shadow hover:bg-gray-100 font-semibold text-base">
    Good Salary!
  </button>
</div>
        {/* Right - Image */}
        <div className="relative">
          <img
            src="\ChatGPT Image Jun 16, 2025, 06_12_30 PM.png" // Replace with correct path
            alt="Mahalakshmi Garments Poster"
            className=" shadow-lg"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white px-4 sm:px-8 py-4 sm:py-6 shadow text-center text-xs sm:text-sm text-gray-600">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <div className="flex items-center gap-3 justify-center mx-auto">
            <img
              src="\cursor.png"
              alt="Footer logo"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <span className="text-gray-700 font-medium text-sm">
              Stitch | Earn | Grow
            </span>
          </div>
        </div>

        {/* 🚗 Car + Road Animation Component */}
        <CarRoadAnimation />
      </footer>
    </div>
  );
};

export default MahalakshmiGarmentsCard;
