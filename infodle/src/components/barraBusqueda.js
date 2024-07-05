import React, { useEffect, useRef } from 'react';

const BarraBusqueda = ({ nombreIngresado, handleInputChange, handleKeyDown, sugerencias, handleSuggestionClick, selectedSuggestionIndex, disabled }) => {
  const suggestionRefs = useRef([]);

  useEffect(() => {
    if (selectedSuggestionIndex >= 0 && suggestionRefs.current[selectedSuggestionIndex]) {
      suggestionRefs.current[selectedSuggestionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, [selectedSuggestionIndex]);

  return (
    <div className="relative mt-10 flex justify-center z-10">
      <input
        type="text"
        value={nombreIngresado}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Añadir manejador de evento de teclado
        disabled={disabled} // Deshabilitar la entrada si el profesor ha sido adivinado
        className="border border-gray-300 rounded-full py-2 px-4 w-1/2 max-w-md"
        placeholder="Ingrese el nombre del profesor"
      />
      {sugerencias.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg mt-10 w-full max-w-md max-h-40 overflow-y-auto shadow-lg z-15">
          {sugerencias.map((sugerencia, index) => (
            <li
              key={index}
              ref={el => suggestionRefs.current[index] = el}
              onClick={() => handleSuggestionClick(sugerencia)}
              className={`cursor-pointer p-2 ${index === selectedSuggestionIndex ? 'bg-gray-300' : ''}`} // Resaltar la sugerencia seleccionada
            >
              {sugerencia}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarraBusqueda;