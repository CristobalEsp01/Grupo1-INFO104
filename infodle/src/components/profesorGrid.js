import React from 'react';
import ProfesorCard from './profesorCard';

const ProfessorGrid = ({ adivinanzas, profesorDelDia }) => (
  <div className="mt-10 text-center">
    <div className="flex justify-center space-x-4 mb-4">
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Profesor</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Género</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Grado Académico</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Carrera</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Universidad</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Egreso</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center">Asignaturas</div>
    </div>
    {adivinanzas.map((profesor, index) => (
      <ProfesorCard key={index} profesor={profesor} profesorDelDia={profesorDelDia} />
    ))}
  </div>
);

export default ProfessorGrid;
