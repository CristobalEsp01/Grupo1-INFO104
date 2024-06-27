import React from 'react';

const BotonVolver = ({ handleClick, text }) => (
  <button
    className="fixed bottom-5 left-5 bg-stone-100 hover:bg-stone-600 hover:text-white text-black font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg z-10"
    onClick={handleClick}
  >
    {text}
  </button>
);

export default BotonVolver;
