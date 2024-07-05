import React from 'react';

const DetalleProfesor = ({ profesor, onClose }) => {
  if (!profesor) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{profesor.nombre}</h2>
        <img src={profesor.foto} alt={profesor.nombre} className="mb-4 w-32 h-32 rounded-full" />
        <p><strong>Grado Académico:</strong> {profesor.gradAcademico}</p>
        <p><strong>Carrera:</strong> {profesor.carrera}</p>
        <p><strong>Universidad:</strong> {profesor.universidad}</p>
        <p><strong>Año de Egreso:</strong> {profesor.egreso}</p>
        <p><strong>Asignaturas:</strong> {profesor.asignaturas.join(', ')}</p>
      </div>
    </div>
  );
};

export default DetalleProfesor;
