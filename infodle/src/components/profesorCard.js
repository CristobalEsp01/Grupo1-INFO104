import React from 'react';

const ProfesorCard = ({ profesor, profesorDelDia }) => {
  const getColor = (atributo) => {
    if (profesor[atributo] === profesorDelDia[atributo]) {
      return 'bg-green-500';
    } else if (atributo === 'asignaturas') {
      const coincidencias = profesor[atributo].filter(asignatura => profesorDelDia[atributo].includes(asignatura));
      return coincidencias.length > 0 ? 'bg-orange-500' : 'bg-red-500';
    } else {
      return 'bg-red-500';
    }
  };

  const cardStyle = (atributo) => `flex justify-center items-center ${getColor(atributo)} text-white font-bold text-lg h-20 w-32 m-1 rounded-md text-center`;

  return (
    <div className="flex justify-center items-center space-x-4 p-4 rounded-lg shadow-md">
      <div className={cardStyle('genero')}>{profesor.genero}</div>
      <div className={cardStyle('gradAcademico')}>{profesor.gradAcademico}</div>
      <div className={cardStyle('carrera')}>{profesor.carrera}</div>
      <div className={cardStyle('universidad')}>{profesor.universidad}</div>
      <div className={cardStyle('egreso')}>{profesor.egreso}</div>
      <div className={cardStyle('asignaturas')}>{profesor.asignaturas.join(', ')}</div>
    </div>
  );
};

export default ProfesorCard;
