import React from 'react';

const BotonVolver = ({ handleClick, text }) => (
  <button
    className="fixed bottom-5 left-5 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg"
    onClick={handleClick}
  >
    {text}
  </button>
);

export default BotonVolver;
