import React from 'react';
import ProfesorCard from './profesorCard';

const ProfessorGrid = ({ adivinanzas, profesorDelDia }) => (
  <div className="mt-10 text-center z-15">
    <div className="flex justify-center space-x-4 mb-4">
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center border-solid border-2 border-slate-950">Profesor</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center border-solid border-2 border-slate-950">Género</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center border-solid border-2 border-slate-950">Grado Académico</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center border-solid border-2 border-slate-950">Carrera</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center border-solid border-2 border-slate-950">Universidad</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center border-solid border-2 border-slate-950">Egreso</div>
      <div className="bg-gray-200 p-2 rounded-md w-32 h-20 flex justify-center items-center border-solid border-2 border-slate-950">Asignaturas</div>
    </div>
    {adivinanzas.map((profesor, index) => (
      <ProfesorCard key={index} profesor={profesor} profesorDelDia={profesorDelDia} />
    ))}
  </div>
);

export default ProfessorGrid;
