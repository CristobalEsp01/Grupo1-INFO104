import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const DetalleProfesor = ({ profesor, onClose }) => {
  if (!profesor) return null;

  useEffect(() => {
    console.log('Profesor:', profesor); // Verificar que los datos del profesor se reciban correctamente

    // Configuración de la animación de confeti
    const duration = 5 * 1000; // Duración de la animación
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Lanzar confeti desde la izquierda
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: 0, y: Math.random() }
      }));
      // Lanzar confeti desde la derecha
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: 1, y: Math.random() }
      }));
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, [profesor]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md transform transition-transform duration-500 ease-out scale-105 opacity-0 animate-fadeInScale">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-extrabold text-black drop-shadow-md p-3">
            El Profesor del día es:
          </h2>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">{profesor.nombre}</h3>
        </div>
        <div className="text-center p">
          <img src={profesor.foto} alt={profesor.nombre} className="mb-4 w-32 h-32 rounded-full mx-auto" />
        </div>
        <div className="text-left">
          <p className="text-gray-600">{profesor.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default DetalleProfesor;
