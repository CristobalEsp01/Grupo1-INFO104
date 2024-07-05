"use client"
import React, { useState, useEffect } from 'react';
import TituloInfodle from '../components/tituloInfodle';
import BarraBusqueda from '../components/barraBusqueda';
import BotonVolver from '../components/botonVolver';
import ProfesorGrid from '../components/profesorGrid';
import CuadroPistas from '../components/cuadroPistas';
import ModalInstrucciones from '../components/modalInstrucciones';
import DetalleProfesor from '../components/detallesProfesor';
import profesores from '../data/profesores.json';

const Page = () => {
  const [profesorDelDia, setProfesorDelDia] = useState(null);
  const [nombreIngresado, setNombreIngresado] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [intentos, setIntentos] = useState(5);
  const [adivinanzas, setAdivinanzas] = useState([]);
  const [showModal, setShowModal] = useState(true); // Estado inicial del modal es true
  const [showDetalle, setShowDetalle] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // Para manejar la selección con las flechas

  useEffect(() => {
    seleccionarProfesorDelDia();
    setShowModal(true); // Mostrar el modal inmediatamente después de cargar la página
  }, []);

  const seleccionarProfesorDelDia = () => {
    const hoy = new Date().toLocaleDateString();
    const profesorGuardado = localStorage.getItem('profesorDelDia');

    if (profesorGuardado) {
      const { profesor, fecha } = JSON.parse(profesorGuardado);
      if (fecha === hoy) {
        setProfesorDelDia(profesor);
      } else {
        const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
        setProfesorDelDia(profesorAleatorio);
        localStorage.setItem('profesorDelDia', JSON.stringify({ profesor: profesorAleatorio, fecha: hoy }));
      }
    } else {
      const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
      setProfesorDelDia(profesorAleatorio);
      localStorage.setItem('profesorDelDia', JSON.stringify({ profesor: profesorAleatorio, fecha: hoy }));
    }
  };

  const handleInputChange = (e) => {
    if (showDetalle) return; // Deshabilitar la entrada si el profesor ha sido adivinado
    const value = e.target.value;
    setNombreIngresado(value);
    setSelectedSuggestionIndex(-1); // Reiniciar la selección de sugerencia cuando se ingresa un nuevo valor
    if (value.length > 0) {
      const normalizedValue = normalizeString(value.toLowerCase());
      const filteredSugerencias = profesores
        .map(profesor => profesor.nombre)
        .filter(nombre =>
          normalizeString(nombre.toLowerCase()).includes(normalizedValue)
        );
      setSugerencias(filteredSugerencias);
    } else {
      setSugerencias([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0) {
        const suggestion = sugerencias[selectedSuggestionIndex];
        if (suggestion) {
          handleSuggestionClick(suggestion);
        }
      } else {
        const suggestion = sugerencias[0];
        if (suggestion) {
          handleSuggestionClick(suggestion);
        }
      }
    } else if (e.key === 'ArrowDown') {
      setSelectedSuggestionIndex((prevIndex) => Math.min(prevIndex + 1, sugerencias.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (showDetalle) return; // Deshabilitar los clics en sugerencias si el profesor ha sido adivinado
    setNombreIngresado(suggestion);
    if (intentos > 0) {
      setIntentos(intentos - 1);
    }
    setSugerencias([]);
    const adivinadoProfesor = profesores.find(prof => prof.nombre === suggestion);
    setAdivinanzas(prevAdivinanzas => [adivinadoProfesor, ...prevAdivinanzas]);
    if (adivinadoProfesor.nombre === profesorDelDia.nombre) {
      setShowDetalle(true); // Mostrar detalles si el usuario adivina correctamente
    }
  };

  const handleOpenModal = () => {
    if (!showDetalle) setShowModal(true); // Deshabilitar el botón si el profesor ha sido adivinado
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseDetalle = () => setShowDetalle(false); // Función para cerrar detalles del profesor

  return (
    <>
      <div className={`fixed inset-0 ${showModal ? 'bg-gray-900 bg-opacity-10 backdrop-blur-sm' : ''} z-10`}>
        <ModalInstrucciones showModal={showModal} handleCloseModal={handleCloseModal} />
      </div>
      <div className={`p-6 ${showModal ? 'opacity-50' : ''}`}>
        <TituloInfodle />
        <BarraBusqueda
          nombreIngresado={nombreIngresado}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown} // Añadir manejador de evento de teclado
          sugerencias={sugerencias}
          selectedSuggestionIndex={selectedSuggestionIndex} // Pasar el índice de la sugerencia seleccionada
          handleSuggestionClick={handleSuggestionClick}
          disabled={showDetalle} // Deshabilitar la barra de búsqueda si el profesor ha sido adivinado
        />
        {!showDetalle && <BotonVolver handleClick={handleOpenModal} text="Volver a Instrucciones" />} {/* Mostrar el botón solo si no se ha adivinado */}
        {!showDetalle && <CuadroPistas intentos={intentos} />} {/* Mostrar el cuadro de pistas solo si no se ha adivinado */}
        <ProfesorGrid adivinanzas={adivinanzas} profesorDelDia={profesorDelDia} />
      </div>
      {showDetalle && <DetalleProfesor profesor={profesorDelDia} onClose={handleCloseDetalle} />} {/* Renderizar detalles del profesor si showDetalle es true */}
    </>
  );
};

const normalizeString = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export default Page;
