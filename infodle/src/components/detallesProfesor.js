import React from 'react';

const DetalleProfesor = ({ profesor, onClose }) => {
  if (!profesor) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md transform transition-transform duration-500 ease-out scale-105 opacity-0 animate-fadeInScale">
        <button onClick={onClose} className="text-red-500 font-bold mb-4 float-right">X</button>
        <div className="text-center">
          <img src={profesor.foto} alt={profesor.nombre} className="mb-4 w-32 h-32 rounded-full mx-auto" />
          <h2 className="text-2xl font-bold mb-2">{profesor.nombre}</h2>
          <p className="text-gray-700 mb-4">{profesor.gradAcademico} en {profesor.carrera}</p>
        </div>
        <div className="text-left">
          <p className="text-gray-600 mb-2"><strong>Universidad:</strong> {profesor.universidad}</p>
          <p className="text-gray-600 mb-2"><strong>Año de Egreso:</strong> {profesor.egreso}</p>
          <p className="text-gray-600 mb-2"><strong>Asignaturas:</strong> {profesor.asignaturas.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default DetalleProfesor;