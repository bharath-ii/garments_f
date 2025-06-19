import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F89484] text-black font-sans flex flex-col justify-center items-center py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="bg-white  shadow-lg p-6 sm:p-8 max-w-md sm:max-w-lg md:max-w-xl w-full space-y-4 text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">Contact Us</h2>

        <p>
          <span className="font-semibold text-gray-700">👤 Owner:</span> Subramaniam R
        </p>
        <p>
          <span className="font-semibold text-gray-700">🏢 Company:</span> Sri Mahalakshmi Garments
        </p>
        <p>
          <span className="font-semibold text-gray-700">📍 Address:</span> 3/100B, Panangadu,<br />
          Kanthayeepalayam, T.G. Palayam (Po),<br />
          Avinashi (Tk), Tiruppur - 638462
        </p>
        <p>
          <span className="font-semibold text-gray-700">📞 Cell:</span>{' '}
          <a href="tel:+919597100164" className="text-blue-600 hover:underline">
            9597100164
          </a>
        </p>
        <p>
          <span className="font-semibold text-gray-700">🧾 GSTIN:</span> 33DRYPS4654E126
        </p>

        <div className="mt-6">
          <button className="bg-red-500 text-white px-5 sm:px-6 py-2 hover:bg-red-600 transition">
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
