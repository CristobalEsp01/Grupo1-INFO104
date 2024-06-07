import React from 'react';
import AtributosElemento from './atributosElemento';
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
      <AtributosElemento atributo="genero" valor={profesor.genero} color={getColor('genero')} />
      <AtributosElemento atributo="gradAcademico" valor={profesor.gradAcademico} color={getColor('gradAcademico')} />
      <AtributosElemento atributo="carrera" valor={profesor.carrera} color={getColor('carrera')} />
      <AtributosElemento atributo="universidad" valor={profesor.universidad} color={getColor('universidad')} />
      <AtributosElemento atributo="egreso" valor={profesor.egreso} color={getColor('egreso')} />
      <AtributosElemento atributo="asignaturas" valor={profesor.asignaturas.join(', ')} color={getColor('asignaturas')} />
    </div>
  );
};

export default ProfesorCard;
