import React from 'react';

const BarraBusqueda = ({ nombreIngresado, handleInputChange, sugerencias, handleSuggestionClick }) => (
  <div className="relative mt-10 flex justify-center z-10">
    <input
      type="text"
      placeholder="Ingresa el nombre del profesor"
      value={nombreIngresado}
      onChange={handleInputChange}
      className="border border-gray-300 rounded-full py-2 px-4 w-1/2 max-w-md"
    />
    {sugerencias.length > 0 && (
      <ul className="absolute bg-white border border-gray-300 rounded-lg mt-10 w-full max-w-md max-h-40 overflow-y-auto shadow-lg z-10">
        {sugerencias.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 cursor-pointer hover:bg-gray-100 transition duration-200"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default BarraBusqueda;
