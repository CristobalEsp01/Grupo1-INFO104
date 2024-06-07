import React from 'react';
import AtributosCard from './atributosCard';
import ImagenProfesor from './imagenProfesor';

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

  return (
    <div className="flex justify-center items-center space-x-4 p-0.5 rounded-lg">
      <ImagenProfesor src={profesor.foto} alt={`${profesor.nombre} foto`} />
      <AtributosCard atributo="genero" valor={profesor.genero} color={getColor('genero')} />
      <AtributosCard atributo="gradAcademico" valor={profesor.gradAcademico} color={getColor('gradAcademico')} />
      <AtributosCard atributo="carrera" valor={profesor.carrera} color={getColor('carrera')} />
      <AtributosCard atributo="universidad" valor={profesor.universidad} color={getColor('universidad')} />
      <AtributosCard atributo="egreso" valor={profesor.egreso} color={getColor('egreso')} />
      <AtributosCard atributo="asignaturas" valor={profesor.asignaturas.join(', ')} color={getColor('asignaturas')} />
    </div>
  );
};

export default ProfesorCard;
